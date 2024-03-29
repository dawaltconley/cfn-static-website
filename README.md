# Static Website CloudFormation Templates

A number of modular CloudFormation templates for static website resources.

## Templates

See the full documentation on each template. Note that some templates depend on 
external resources, which must be provisioned first. These resources are linked 
in their descriptions.

- [domain.template.yaml](docs/domain.md)
- [api-domain.template.yaml](docs/api-domain.md)
- [cloudfront-redirects.template.yaml](docs/cloudfront-redirects.md)
- [static-website.template.yaml](docs/static-website.md)
- [git-pipeline.template.yaml](docs/git-pipeline.md)
- [netlify-cms-deployment.template.yaml](docs/netlify-cms-deployment.md)

## Example Usage

Install the templates using npm:

```
npm install --save-dev @dawaltconley/cfn-static-website
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

Package and deploy:

```bash
aws cloudformation package \
  --template-file $TEMPLATE \
  --s3-bucket $BUCKET \
  --output-template-file $OUTPUT
aws cloudformation deploy \
  --template-file $OUTPUT \
  --stack-name $STACK_NAME \
  --capabilities CAPABILITY_IAM
```
