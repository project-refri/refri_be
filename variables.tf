# aws

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-2"
}

variable "aws_s3_image_main_bucket_name" {
  description = "AWS S3 bucket name for image main"
  type        = string
  sensitive   = true
}

# gcp

variable "cloud_run_image_name" {
  type      = string
  sensitive = true
}


# api-server

variable "DATABASE_URI" {
  type      = string
  sensitive = true
}

variable "JWT_SECRET" {
  type      = string
  sensitive = true
}

variable "JWT_EXPIRES_IN" {
  type      = number
  sensitive = true
}

variable "JWT_REFRESH_EXPIRES_IN" {
  type      = number
  sensitive = true
}

variable "AWS_S3_IMAGE_MAIN_BUCKET" {
  type      = string
  sensitive = true
}

