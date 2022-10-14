# CloudFormation Templates

A number of modular CloudFormation templates for provisioning resources.

## Templates

See the full documentation on each template. Note that some templates are 
dependent on external resources, which must be provisioned first. These 
resources are linked in their descriptions.

### Static Site

- [domain.template.yaml](docs/domain.md)
- [cloudfront-redirects.template.yaml](docs/cloudfront-redirects.md)
- [static-website.template.yaml](docs/static-website.md)
- [git-pipeline.template.yaml](docs/git-pipeline.md)
- [netlify-cms-deployment.template.yaml](docs/netlify-cms-deployment.md)

### Misc

- [spoke.template.yaml](docs/spoke.md)

## Example Usage

Install the templates using npm:

```
npm install --save-dev github:dawaltconley/cfn-static-website#semver:^2.2.1
```

Create a template that references these as nested templates:

```yaml
AWSTemplateFormatVersion: 2010-09-09
Description: A static website.

Resources:
  Domain:
    Type: AWS::CloudFormation::Stack
    DeletionPolicy: Retain
    UpdateReplacePolicy: Delete
    Properties:
      TemplateURL: ./node_modules/@dawaltconley/cfn-static-website/domain.template.yaml
      Parameters:
        Domain: example.com
  StaticWebsite:
    Type: AWS::CloudFormation::Stack
    Properties:
      TemplateURL: ./node_modules/@dawaltconley/cfn-static-website/static-website.template.yaml
      Parameters:
        Domain: example.com
        Subdomain: www
        CertificateArn: !GetAtt Domain.Outputs.CertificateArn
  GitHubDeployment:
    Type: AWS::CloudFormation::Stack
    Properties:
      TemplateURL: ./node_modules/@dawaltconley/cfn-static-website/git-pipeline.template.yaml
      Parameters:
        SiteBucket: !GetAtt StaticWebsite.Outputs.SiteBucket
        SourceLocation: https://github.com/example/repo.git
        EnvironmentImage: aws/codebuild/standard:5.0
        CacheType: S3
  NetlifyCMS:
    Type: AWS::CloudFormation::Stack
    Properties:
      TemplateURL: ./node_modules/@dawaltconley/cfn-static-website/netlify-cms-deployment.template.yaml
      Parameters:
        HostDomain: https://www.example.com
        ApiDomain: example.com
        ApiSubdomain: api
        CertificateArn: !GetAtt Domain.Outputs.CertificateArn
        ClientAuth: SSMParameterValue
```
