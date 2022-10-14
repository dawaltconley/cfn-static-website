# git-pipeline.template.yaml

Creates a CodeBuild environment for automatically deploying a static website.

## Parameters

### SiteBucket

Type: String  
Description: Name of the bucket hosting the static website resources.

### SourceLocation

Type: String  
Description: Source code location. For GitHub, the GitHub repository's clone URL.

### SourceBranch

Type: String  
Description: Branch of the git source to pull from.  
Default: main

### SourceType

Type: String  
Default: GITHUB  
AllowedValues: GITHUB,GITHUB_ENTERPRISE

### BuildSpec

Type: String  
Description: Name of the buildspec file.  
Default: buildspec.yml

### EnvironmentType

Type: String  
Default: LINUX_CONTAINER  
AllowedValues: ARM_CONTAINER,LINUX_CONTAINER,LINUX_GPU_CONTAINER,WINDOWS_CONTAINER,WINDOWS_SERVER_2019_CONTAINER

### EnvironmentImage

Type: String  
Default: aws/codebuild/standard:5.0

### EnvironmentComputeType

Type: String  
Default: BUILD_GENERAL1_SMALL  
AllowedValues: BUILD_GENERAL1_SMALL,BUILD_GENERAL1_MEDIUM,BUILD_GENERAL1_LARGE

### UseBuildArtifacts

Type: String  
Description: Whether to upload the generated files using build artifacts, or manually.  
Default: true  
AllowedValues: true,false

### SecretsManagerArns

Type: CommaDelimitedList  
Description: List of Secret ARNs that the buildspec will reference.  
Default: 

### CacheType

Type: String  
Default: NO_CACHE  
AllowedValues: NO_CACHE,S3,LOCAL

### SourceCredentials

Type: String  
Description: Personal Access Token, or ARN of CodeBuild Source Credential.  
Default: 

## Resources

### Build

Type: AWS::CodeBuild::Project

### CacheBucket

Type: AWS::S3::Bucket  
Condition: S3Cache

### LogGroup

Type: AWS::Logs::LogGroup

### ServiceRole

Type: AWS::IAM::Role