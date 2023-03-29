terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.aws_region
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
