# api-domain.template.yaml

Creates a custom domain for API Gateway.

## Required Parameters

### ApiDomain

Full domain for the API Gateway custom domain that you want to create.

- Type: String

### CertificateArn

Certificate Manager ARN for the ApiDomain certificate. Required to use a custom domain.

- Type: String

## Optional Parameters

### HostedZoneId

If provided, creates a record set group connecting the custom domain to a Route53 zone.

- Type: String
- Default: ""

### HostedZoneName

Can provide this as an alternative to HostedZoneId

- Type: String
- Default: ""

## Resources

### CustomDomain

- Type: AWS::ApiGatewayV2::DomainName

### RecordSetGroup

- Type: AWS::Route53::RecordSetGroup
- Condition: CreateRecordSetGroup

## Outputs

### CustomDomain

### CertificateArn