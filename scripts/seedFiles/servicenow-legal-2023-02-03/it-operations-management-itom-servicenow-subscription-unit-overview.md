## SERVICE NOW Subscription Unit Overview Effective January 21, 2021

## 1

© 2021 ServiceNow, Inc.

# IT Operations Management (ITOM) –

# ServiceNow Subscription Unit Overview


SERVICE NOW Subscription Unit Overview Effective January 21, 2021

###### 2

© 2021 ServiceNow, Inc.

## Table of Contents

##### 1. IT Operations Management (ITOM) .................................................................................................. 3

##### 1.1. Managed IT Resource Types ...................................................................................................... 3

##### 1.2. Subscription Unit Defined Ratios ................................................................................................ 4

##### 1.3. Protocols and Spokes included with ITOM Packages ............................................................. 4


SERVICE NOW Subscription Unit Overview Effective January 21, 2021

###### 3

 © 2021 ServiceNow, Inc.

### 1. IT Operations Management (ITOM)

#### 1.1. Managed IT Resource Types

##### “ Server ” is any physical or virtual server that is represented as a configuration item

##### (“CI”) in a CMDB table listed below and managed by an IT Operations Management

##### (“ITOM”) application.

##### “ PaaS Resource ” is any cloud-based platform service represented as a CI in a CMDB

##### table listed below and managed by an ITOM application.

##### “ Container” is any operating system-level virtualization represented as a CI in a CMDB

##### table listed below and managed by an ITOM application.

##### “End User Computing Device” is any physical or virtual computing device that is

##### not defined as another Managed IT Resource Type and has an Agent Client

##### Collector installed. Agent Client Collector is a ServiceNow agent that is installed

##### on infrastructure components. End User Computing Devices are represented as a

##### CI in a CMDB table listed below and managed by an ITOM application.

##### “ Unresolved Monitored Object ” is any IT Resource for which the ITOM Health Application

##### receives an event or performance metric which is not represented as a CI in a CMDB

##### table.

##### Unresolved Monitored Objects are recorded in the “em_unique_nodes” table

##### with the “type” field equal to “unknown”.

##### Servers PaaS Resources Containers End User Computing

##### Devices

 cmdb_ci_server cmdb_ci_cloud_appserver cmdb_ci_oslv_contain er Cmdb_ci_computer

cmdb_ci_vm_instance cmdb_ci_cloud_database (^) Any CMDB classes derived from the above listed classes Any CMDB classes derived from the above listed classes and not defined as another Managed IT Resource Type cmdb_ci_ucs_rack_unit cmdb_ci_dynamodb_tabl e cmdb_ci_ucs_blade cmdb_ci_cloud_directory cmdb_ci_mainframe_hardw are cmdb_ci_cloud_function Any CMDB classes derived from the above listed classes cmdb_ci_cloud_gateway


SERVICE NOW Subscription Unit Overview Effective January 21, 2021

###### 4

 © 2021 ServiceNow, Inc.  cmdb_ci_cloud_messaging _service cmdb_ci_cloud_webserver Any CMDB classes derived from the above listed classes

#### 1.2. Subscription Unit Defined Ratios

##### Each Managed IT Resource Type defined in Section 1.1 will be counted towards a

##### Subscription Unit based on a predefined ratio of Subscription Unit to Managed IT

##### Resource per the table below:

##### Managed IT Resource Type

##### Subscription Unit : Managed IT

##### Resource Ratio

Server 1 : 1
PaaS Resource 1 : 3
Container 1 : 3

##### Unresolved Monitored

##### Object
1 : 1

##### End User Computing

##### Devices
1 : 4

#### 1.3. Protocols and Spokes included with ITOM Packages

Each ITOM Operator Standard, Professional, and Enterprise package includes

entitlement to the Protocols and Spokes listed below provided the Customer is

separately entitled to the number of IntegrationHub Transactions required for usage.

A Protocol is the communication format or mechanism used when interacting with

a thirdparty system. A Spoke is a predefined action, flow, and/or integration for

connecting or automating third party systems or processes within Flow Designer.

#### Protocols

###### Powershell SSH

##### Spokes

###### Jenkins Microsoft Active Directory

###### Microsoft Azure Active

###### Microsoft SCCM for Client Software

###### Distribution


SERVICE NOW Subscription Unit Overview Effective January 21, 2021

###### 5

© 2021 ServiceNow, Inc.

###### Directory

###### Kubernetes F5 Networks


