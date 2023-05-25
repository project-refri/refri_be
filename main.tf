terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }

    google = {
      source  = "hashicorp/google"
      version = "~> 4.63.0"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.aws_region
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

resource "aws_s3_bucket" "image_main" {
  bucket = var.aws_s3_image_main_bucket_name

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}

resource "aws_s3_bucket_acl" "image_main_acl" {
  bucket = aws_s3_bucket.image_main.id
  acl    = "public-read"
}

resource "google_artifact_registry_repository" "cloud_run_image_repo" {
  location      = "asia-northeast3"
  repository_id = "cloud-run-image-repository"
  description   = "cloud run docker images"
  format        = "DOCKER"

  docker_config {
    immutable_tags = false
  }
}

resource "google_cloud_run_v2_service" "api_server" {
  name     = "api-server"
  location = "asia-northeast3"
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    max_instance_request_concurrency = 100

    scaling {
      min_instance_count = 0
      max_instance_count = 100
    }

    timeout = "30s"

    containers {
      image = var.cloud_run_api_server_image
      resources {
        limits = {
          cpu    = "4"
          memory = "2Gi"
        }
        cpu_idle = true
      }
      ports {
        name           = "http1"
        container_port = 8080
      }
      env {
        name  = "DATABASE_URI"
        value = var.DATABASE_URI
      }
      env {
        name  = "JWT_SECRET"
        value = var.JWT_SECRET
      }
      env {
        name  = "JWT_EXPIRES_IN"
        value = var.JWT_EXPIRES_IN
      }
      env {
        name  = "JWT_REFRESH_EXPIRES_IN"
        value = var.JWT_REFRESH_EXPIRES_IN
      }
      env {
        name  = "AWS_S3_IMAGE_MAIN_BUCKET"
        value = var.AWS_S3_IMAGE_MAIN_BUCKET
      }
      env {
        name  = "AWS_REGION"
        value = var.AWS_REGION
      }
      env {
        name  = "MEMORY_CACHE_DEFAULT_TTL"
        value = var.MEMORY_CACHE_DEFAULT_TTL
      }
      env {
        name  = "MEMORY_CACHE_DEFAULT_MAX"
        value = var.MEMORY_CACHE_DEFAULT_MAX
      }
      env {
        name  = "IMAGE_PROCESS_SERVICE_URL"
        value = var.IMAGE_PROCESS_SERVICE_URL
      }
    }
  }
}

resource "google_cloud_run_v2_service_iam_binding" "api_server_iam" {
  location = google_cloud_run_v2_service.api_server.location
  name     = google_cloud_run_v2_service.api_server.name
  role     = "roles/run.invoker"
  members = [
    "allUsers"
  ]
}

resource "google_cloud_run_v2_service" "image_process_server" {
  name     = "image-process-server"
  location = "asia-northeast3"
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    max_instance_request_concurrency = 80

    scaling {
      min_instance_count = 0
      max_instance_count = 100
    }

    timeout = "30s"

    containers {
      image = var.cloud_run_image_process_server_image
      resources {
        limits = {
          cpu    = "4"
          memory = "4Gi"
        }
        cpu_idle = true
      }
      ports {
        name           = "h2c"
        container_port = 50051
      }
      env {
        name  = "JWT_SECRET"
        value = var.JWT_SECRET
      }
    }
  }
}

resource "google_cloud_run_v2_service_iam_binding" "image_process_server_iam" {
  location = google_cloud_run_v2_service.image_process_server.location
  name     = google_cloud_run_v2_service.image_process_server.name
  role     = "roles/run.invoker"
  members = [
    "allUsers"
  ]
}
