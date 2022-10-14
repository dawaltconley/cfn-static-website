# cloudfront-redirects.template.yaml

Controls URL cleaning and subdomain redirection.

## Parameters

### Subdomain

Type: String  
Default: www

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

## Resources

### RedirectFunction

Type: AWS::CloudFront::Function  
Condition: NeedsCustomFunction

## Outputs

- FunctionArn