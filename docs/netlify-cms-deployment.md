# netlify-cms-deployment.template.yaml

Deployment stage for a website using Netlify CMS.

Depends on https://github.com/dawaltconley/netlify-cms-aws

## Required Parameters

### HostDomain

Full domain name (including protocol) where Netlify CMS will be used.

Type: String

### ClientAuth

A SSM StringList Parameter, where the first parameter corresponds to the Client ID and the second to the Client Secret used for authorizing with GitHub.

Type: AWS::SSM::Parameter::Value<List<String>>  
NoEcho: true

## Optional Parameters

### ApiDomain

Base domain where the api is hosted. Used to create an API Gateway custom domain name for this deployment.

Type: String  
Default: 

### ApiSubdomain

Subdomain where the api is hosted. Used to create an API Gateway custom domain name for this deployment.

Type: String  
Default: api

### ApiBasePath

Type: String  
Default: admin

### CertificateArn

Type: String  
Default: 

### Route53Dns

Whether this domain uses Route53 for its DNS

Type: String  
Default: true  
AllowedValues: true,false

### GitHostname

Type: String  
Default: https://github.com

### OAuthProvider

Type: String  
Default: github

### OAuthScopes

Type: String  
Default: user,repo

### OAuthAuthorizePath

Type: String  
Default: /login/oauth/authorize

### OAuthTokenPath

Type: String  
Default: /login/oauth/access_token

### NetlifyStackName

Name of the stack exporting a Rest API ID for a self-hosted Netlify CMS.

Type: String  
Default: NetlifyCMSAuth

## Resources

### Deployment

Type: AWS::ApiGateway::Deployment

### DomainName

Type: AWS::ApiGateway::DomainName  
Condition: HasCustomApiDomain

### BasePathMapping

Type: AWS::ApiGateway::BasePathMapping  
Condition: HasCustomApiDomain

### RecordSetGroup

Type: AWS::Route53::RecordSetGroup  
Condition: CreateRecordSetGroup

## Outputs

- DeploymentId
- DeploymentStageName
- DeploymentPath?
- ApiDomainName?
- DistributionHostedZone?
- DistributionDomainName?