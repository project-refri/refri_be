variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-2"
}

variable "aws_s3_image_main_bucket_name" {
  description = "AWS S3 bucket name for image main"
  type        = string
  default     = "refri-image-main"
}
