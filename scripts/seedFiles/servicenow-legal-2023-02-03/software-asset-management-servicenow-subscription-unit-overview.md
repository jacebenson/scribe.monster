## S ERVICE N OW Subscription Unit Overview Effective January 21 , 202 1

## 1

## © 2021 ServiceNow, Inc.

## trademarks of ServiceNow, Inc. in the United States and/or other countries. Other company and product names may be trademarks of the respective

# Software Asset Management –

# ServiceNow Subscription Unit Overview


S ERVICE N OW Subscription Unit Overview Effective January 21 , 202 1

###### 2

© 2021 ServiceNow, Inc.

## Table of Contents

##### 1. Software Asset Management............................................................................................................. 3

##### 1.1. Managed IT Resource Types ...................................................................................................... 3

##### 1.2. Subscription Unit Defined Ratios ................................................................................................ 3


S ERVICE N OW Subscription Unit Overview Effective January 21 , 202 1

###### 3

© 2021 ServiceNow, Inc.

### 1. Software Asset Management

#### 1.1. Managed IT Resource Types

##### “ Server ” is any physical or virtual server that is represented as a configuration item (“CI”)

##### in a

##### CMDB table listed below and managed by the Software Asset Management

##### application.

##### “ End User Computing Device ” is any physical or virtual non-Server CI in a CMDB table

##### listed below and managed by the Software Asset Management application.

##### “SaaS Subscription User” is any unique User Principal Name in the SaaS Subscription User

##### table listed below managed by the Software Asset Management application.

##### Servers and End User Computing Devices are managed by the Software Asset

##### Management application when the installed software on the Managed IT

##### Resources is represented in the cmdb_sam_sw_install table.

##### Servers

##### End User Computing

##### Device

##### SaaS Subscription User

cmdb_ci_server cmdb_ci_computer samp_sw_subscription

cmdb_ci_vm_instance (^) the above listed classes and notAny CMDB classes derived from defined as another Managed IT Resource Type cmdb_ci_ucs_rack_unit cmdb_ci_ucs_blade Any CMDB classes derived from the above listed classes

#### 1.2. Subscription Unit Defined Ratios

##### Each Managed IT Resource Type defined in Section 2.1 will be counted towards a

##### Subscription Unit based on a predefined ratio of Subscription Unit to Managed IT

##### Resource per the table below:


S ERVICE N OW Subscription Unit Overview Effective January 21 , 202 1

###### 4

© 2021 ServiceNow, Inc.

##### Managed IT Resource Type

##### Subscription Unit : Managed IT

##### Resource Ratio

##### Server 1 : 1

##### End User Computing Device 1 : 4

##### SaaS Subscription User 1:15


