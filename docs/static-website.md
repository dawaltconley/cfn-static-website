# static-website.template.yaml

A template for launching static sites on AWS.

## Parameters

### Domain

Type: String  
Description: Base domain name for the static website.

### Subdomain

Type: String  
Description: Primary subdomain to associate with the website. Pass an empty string for apex domains.  
Default: www

### Redirect

Type: String  
Default: ApexToSubdomain  
AllowedValues: ApexToSubdomain,SubdomainToApex,None

### TrailingSlash

Type: String  
Default: true  
AllowedValues: true,false

### IndexDocument

Type: String  
Default: index.html

### UrlRedirectsStackName

Type: String  
Description: Name of the stack exporting basic URL redirect functions: install from https://github.com/dawaltconley/cloudfront-redirects  
Default: UrlRedirects

### Route53Dns

Type: String  
Description: Whether this domain uses Route53 for its DNS  
Default: true  
AllowedValues: true,false

### CertificateArn

Type: String  
Description: Represents an existing certificate.  
Default: 

### CertificateType

Type: String  
Description: Indicates whether to use the certificate from the AWS Certificate Manager or AWS Identity and Access Management.  
Default: AcmCertificateArn  
AllowedValues: AcmCertificateArn,IamCertificateId

### CloudFrontAliases

Type: CommaDelimitedList  
Description: A list of extra aliases for the CloudFront distribution. The Domain and Subdomain parameters included automatically. DNS records pointing them to the distribution must be handled separately.  
Default: 

### CloudFrontPriceClass

Type: String  
Description: Price class for CloudFront distribution.  
Default: PriceClass_All  
AllowedValues: PriceClass_100,PriceClass_200,PriceClass_All

### CloudFrontSecurityPolicy

Type: String  
Description: The minimum security policy for the CloudFront distribution.  
Default: TLSv1.2_2021  
AllowedValues: TLSv1.2_2021,TLSv1.2_2019,TLSv1.2_2018,TLSv1.1_2016,TLSv1_2016,TLSv1

### CloudFrontCachePolicy

Type: String  
Description: Default cache policy.  
Default: CachingOptimized  
AllowedValues: CachingOptimized,CachingOptimizedForUncompressedObjects,CachingDisabled

### CloudFrontHtmlCachePolicy

Type: String  
Description: Cache policy for delivering HTML files.  
Default: CachingDisabled  
AllowedValues: CachingOptimized,CachingOptimizedForUncompressedObjects,CachingDisabled

## Resources

### RecordSetGroup

Type: AWS::Route53::RecordSetGroup  
Condition: CreateRecordSetGroup

### Distribution

Type: AWS::CloudFront::Distribution

### OriginAccessIdentity

Type: AWS::CloudFront::CloudFrontOriginAccessIdentity

### RedirectFunction

Type: AWS::CloudFormation::Stack

### SiteBucket

Type: AWS::S3::Bucket

### SiteBucketPolicy

Type: AWS::S3::BucketPolicy

## Outputs

- StackName
- ApexDomain
- PrimarySubdomain
- FullDomain
- SiteBucket
- SiteBucketArn
- DistributionDomainName