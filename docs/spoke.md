# spoke.template.yaml



## Parameters

### DBPassword

Type: String  
Description: A password to secure access to the Spoke database.  
AllowedPattern: [^/"@]+  
ConstraintDescription: can include any printable ASCII character except "/", """, or "@".  
MinLength: 8  
MaxLength: 128

### DBInstanceClass

Type: String  
Description: The instance class of the Spoke database.  
Default: db.m5.large  
AllowedValues: db.m5.24xlarge,db.m5.12xlarge,db.m5.4xlarge,db.m5.2xlarge,db.m5.xlarge,db.m5.large,db.m4.16xlarge,db.m4.10xlarge,db.m4.4xlarge,db.m4.2xlarge,db.m4.xlarge,db.m4.large,db.m3.2xlarge,db.m3.xlarge,db.m3.large,db.m3.medium,db.m1.xlarge,db.m1.large,db.m1.medium,db.m1.small,db.z1d.12xlarge,db.z1d.6xlarge,db.z1d.3xlarge,db.z1d.2xlarge,db.z1d.xlarge,db.z1d.large,db.x1e.32xlarge,db.x1e.16xlarge,db.x1e.8xlarge,db.x1e.4xlarge,db.x1e.2xlarge,db.x1e.xlarge,db.x1.32xlarge,db.x1.16xlarge,db.r5.24xlarge,db.r5.12xlarge,db.r5.4xlarge,db.r5.2xlarge,db.r5.xlarge,db.r5.largedb.r4.16xlarge,db.r4.8xlarge,db.r4.4xlarge,db.r4.2xlarge,db.r4.xlarge,db.r4.large,db.r3.8xlarge,db.r3.4xlarge,db.r3.2xlarge,db.r3.xlarge,db.r3.large,db.m2.4xlarge,db.m2.2xlarge,db.m2.xlarge,db.t3.2xlarge,db.t3.xlarge,db.t3.large,db.t3.medium,db.t3.small,db.t3.micro,db.t2.large,db.t2.medium,db.t2.small,db.t2.micro

## Resources

### SpokeBucket

Type: AWS::S3::Bucket

### SpokeVPC

Type: AWS::EC2::VPC

### PublicSubnetA

Type: AWS::EC2::Subnet

### PublicSubnetB

Type: AWS::EC2::Subnet

### PrivateSubnetA

Type: AWS::EC2::Subnet

### PrivateSubnetB

Type: AWS::EC2::Subnet

### EIPAddress

Type: AWS::EC2::EIP  
DependsOn: SpokeVPC

### NatGateway

Type: AWS::EC2::NatGateway

### InternetGateway

Type: AWS::EC2::InternetGateway

### InternetGatewayAttachment

Type: AWS::EC2::VPCGatewayAttachment

### PublicRouteTable

Type: AWS::EC2::RouteTable

### PublicRoute1

Type: AWS::EC2::Route  
DependsOn: InternetGatewayAttachment

### PrivateRouteTable

Type: AWS::EC2::RouteTable

### PrivateRoute1

Type: AWS::EC2::Route

### SecurityGroup

Type: AWS::EC2::SecurityGroup

### HttpIngress

Type: AWS::EC2::SecurityGroupIngress

### HttpsIngress

Type: AWS::EC2::SecurityGroupIngress

### RDSGroup

Type: AWS::RDS::DBSubnetGroup

### RDSInstance

Type: AWS::RDS::DBInstance

### SpokeAPI

Type: AWS::Serverless::Api