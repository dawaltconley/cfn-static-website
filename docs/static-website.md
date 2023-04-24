# static-website.template.yaml

A template for launching static sites on AWS.

Includes cloudfront-redirects.template.yaml, which depends on https://github.com/dawaltconley/cloudfront-redirects

## Required Parameters

### Domain

Base domain name for the static website.

- Type: String

## Optional Parameters

### Subdomain

Primary subdomain to associate with the website. Pass an empty string for apex domains.

- Type: String
- Default: www

### 404Page

S3 object path to a custom 404 page.

- Type: String
- Default: ""

### Redirect

- Type: String
- Default: ApexToSubdomain
- AllowedValues:
  - ApexToSubdomain
  - SubdomainToApex
  - None

### TrailingSlash

- Type: String
- Default: true
- AllowedValues:
  - true
  - false

### IndexDocument

- Type: String
- Default: index.html

### UrlRedirectsStackName

Name of the stack exporting basic URL redirect functions: install from https://github.com/dawaltconley/cloudfront-redirects

- Type: String
- Default: UrlRedirects

### Route53Dns

Whether this domain uses Route53 for its DNS

- Type: String
- Default: true
- AllowedValues:
  - true
  - false

### CertificateArn

Represents an existing certificate.

- Type: String
- Default: ""

### CertificateType

Indicates whether to use the certificate from the AWS Certificate Manager or AWS Identity and Access Management.

- Type: String
- Default: AcmCertificateArn
- AllowedValues:
  - AcmCertificateArn
  - IamCertificateId

### CloudFrontAliases

A list of extra aliases for the CloudFront distribution. The Domain and Subdomain parameters included automatically. DNS records pointing them to the distribution must be handled separately.

- Type: CommaDelimitedList
- Default: ""

### CloudFrontPriceClass

Price class for CloudFront distribution.

- Type: String
- Default: PriceClass_All
- AllowedValues:
  - PriceClass_100
  - PriceClass_200
  - PriceClass_All

### CloudFrontSecurityPolicy

The minimum security policy for the CloudFront distribution.

- Type: String
- Default: TLSv1.2_2021
- AllowedValues:
  - TLSv1.2_2021
  - TLSv1.2_2019
  - TLSv1.2_2018
  - TLSv1.1_2016
  - TLSv1_2016
  - TLSv1

### CloudFrontCachePolicy

Default cache policy.

- Type: String
- Default: CachingOptimized
- AllowedValues:
  - CachingOptimized
  - CachingOptimizedForUncompressedObjects
  - CachingDisabled

### CloudFrontHtmlCachePolicy

Cache policy for delivering HTML files.

- Type: String
- Default: CachingDisabled
- AllowedValues:
  - CachingOptimized
  - CachingOptimizedForUncompressedObjects
  - CachingDisabled

## Resources

### RecordSetGroup

- Type: AWS::Route53::RecordSetGroup
- Condition: CreateRecordSetGroup

### Distribution

- Type: AWS::CloudFront::Distribution

### OriginAccessIdentity

- Type: AWS::CloudFront::CloudFrontOriginAccessIdentity

### RedirectFunction

- Type: AWS::CloudFormation::Stack

### SiteBucket

- Type: AWS::S3::Bucket

### SiteBucketPolicy

- Type: AWS::S3::BucketPolicy

## Outputs

### StackName

### ApexDomain

### PrimarySubdomain

### FullDomain

### SiteBucket

### SiteBucketArn

### DistributionDomainName