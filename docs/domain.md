# domain.template.yaml

Creates a basic public zone.

## Parameters

### Domain

Type: String  
Description: Base domain name for the static website.

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