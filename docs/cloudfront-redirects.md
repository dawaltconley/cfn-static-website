# cloudfront-redirects.template.yaml

Controls URL cleaning and subdomain redirection.

Depends on https://github.com/dawaltconley/cloudfront-redirects

## Optional Parameters

### Subdomain

- Type: String
- Default: www

### SubdomainRedirect

- Type: String
- Default: true
- AllowedValues:
  - true
  - false

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

## Resources

### RedirectFunction

- Type: AWS::CloudFront::Function
- Condition: NeedsCustomFunction

## Outputs

### FunctionArn

Arn for the function handling subdomain and uri redirects.