# domain.template.yaml

Creates a basic public zone.

## Required Parameters

### Domain

Base domain name for the static website.

Type: String

## Optional Parameters

## Resources

### Certificate

Type: AWS::CertificateManager::Certificate

### HostedZone

Type: AWS::Route53::HostedZone

## Outputs

- HostedZoneId
- NameServers
- CertificateArn
- CertificateType