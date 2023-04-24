# git-pipeline.template.yaml

Creates a CodeBuild environment for automatically deploying a static website.

## Required Parameters

### SiteBucket

Name of the bucket hosting the static website resources.

- Type: String

### SourceLocation

Source code location. For GitHub, the GitHub repository's clone URL.

- Type: String

## Optional Parameters

### SiteBucketEnvVariable

Name of the build environment variable that exposes the SiteBucket value.

- Type: String
- Default: SITE_BUCKET

### SourceBranch

Branch of the git source to pull from.

- Type: String
- Default: main

### SourceType

- Type: String
- Default: GITHUB
- AllowedValues:
  - GITHUB
  - GITHUB_ENTERPRISE

### BuildSpec

Name of the buildspec file.

- Type: String
- Default: buildspec.yml

### EnvironmentType

- Type: String
- Default: LINUX_CONTAINER
- AllowedValues:
  - ARM_CONTAINER
  - LINUX_CONTAINER
  - LINUX_GPU_CONTAINER
  - WINDOWS_CONTAINER
  - WINDOWS_SERVER_2019_CONTAINER

### EnvironmentImage

- Type: String
- Default: aws/codebuild/standard:5.0

### EnvironmentComputeType

- Type: String
- Default: BUILD_GENERAL1_SMALL
- AllowedValues:
  - BUILD_GENERAL1_SMALL
  - BUILD_GENERAL1_MEDIUM
  - BUILD_GENERAL1_LARGE

### UseBuildArtifacts

Whether to upload the generated files using build artifacts, or manually.

- Type: String
- Default: true
- AllowedValues:
  - true
  - false

### ParameterStoreArns

List of Parameter ARNs that the buildspec will reference.

- Type: CommaDelimitedList
- Default: ""

### SecretsManagerArns

List of Secret ARNs that the buildspec will reference.

- Type: CommaDelimitedList
- Default: ""

### CacheType

- Type: String
- Default: NO_CACHE
- AllowedValues:
  - NO_CACHE
  - S3
  - LOCAL

### SourceCredentials

Personal Access Token, or ARN of CodeBuild Source Credential.

- Type: String
- Default: ""

## Resources

### Build

- Type: AWS::CodeBuild::Project

### CacheBucket

- Type: AWS::S3::Bucket
- Condition: S3Cache

### LogGroup

- Type: AWS::Logs::LogGroup

### ServiceRole

- Type: AWS::IAM::Role