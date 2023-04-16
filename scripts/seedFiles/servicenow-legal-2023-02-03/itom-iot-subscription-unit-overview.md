## SERVICENOW Subscription Unit Overview Effective May 10 , 2022

## 1

© 2022 ServiceNow, Inc.

# IT Operations Management (ITOM) – IoT

# ServiceNow Subscription Unit Overview


SERVICENOW Subscription Unit Overview Effective May 10 , 2022

###### 2

© 2022 ServiceNow, Inc.

## Table of Contents

##### 1. IT Operations Management (ITOM) .................................................................................................... 3

##### 1.1. Managed IT Resource Types....................................................................................................... 3

##### 1.2. Subscription Unit Defined Ratios ............................................................................................... 4


SERVICENOW Subscription Unit Overview Effective May 10 , 2022

###### 3

 © 2022 ServiceNow, Inc.

### 1. IT Operations Management (ITOM) IoT

#### 1.1. Managed IT Resource Types

##### “ Server ” is any physical or virtual server that is represented as a configuration item (“CI”) in a

##### CMDB table listed below and managed by an IT Operations Management (“ITOM”)

##### application.

##### “ PaaS Resource ” is any cloud-based platform service represented as a CI in a CMDB table

##### listed below and managed by an ITOM application.

##### “ Container” is any operating system-level virtualization represented as a CI in a CMDB table

##### listed below and managed by an ITOM application.

##### “End User Computing Device” is any physical or virtual computing device that is not

##### defined as another Managed IT Resource Type and has an Agent Client Collector installed.

##### Agent Client Collector is a ServiceNow agent that is installed on infrastructure

##### components. End User Computing Devices are represented as a CI in a CMDB table

##### listed below and managed by an ITOM application.

##### “ Unresolved Monitored Object ” is any IT Resource for which the ITOM Health Application

##### receives an event or performance metric which is not represented as a CI in a CMDB table.

##### Unresolved Monitored Objects are recorded in the “em_unique_nodes” table with the

##### “type” field equal to “unknown”.

##### “ IoT ” is any physical or virtual device represented as a CI in a CMDB table listed below and

##### managed by an ITOM application.

##### “ Networking Device ” is any networking equipment that is represented as a CI in a CMDB table listed

##### below and managed by an application.

##### “Networking Devices Advanced” is any networking equipment that is represented as a CI in a

##### CMDB table listed below and managed by an ITOM application.

 Servers PaaS Resources Containers End User Computing Devices IoT Networkin g Devices Networking Devices Advanced cmdb_ci_server cmdb_ci_cloud_apps erver cmdb_ci_oslv _container Cmdb_ci_c omputer

cmdb_ci_iot (^) cmdb_ci_ netgear cmdb_ci_equipme nt_holder **cmdb_ci_vm_insta nce** cmdb_ci_cloud_data base Any CMDB classes derived from the above listed classes Any CMDB classes derived from the above listed classes and not defined as another cmdb_ci_conve rged_infra cmdb_ci_ni_equipment_holder


SERVICENOW Subscription Unit Overview Effective May 10 , 2022

###### 4

 © 2022 ServiceNow, Inc.  Managed IT Resource Type cmdb_ci_ucs_rack _unit cmdb_ci_dynamodb _table Any CMDB classes derived from the above listed classes cmdb_ci_ni_interf ace cmdb_ci_ucs_blad e cmdb_ci_cloud_direct ory cmdb_ci_site cmdb_ci_mainfra me_hardware cmdb_ci_cloud_functi on cmdb_ci_ni_site Any CMDB classes derived from the above listed classes cmdb_ci_cloud_gate way cmdb_ci_ni_physi cal_link cmdb_ci_cloud_mess aging_service cmdb_ci_ni_logica l_path cmdb_ci_cloud_webs erver Any CMDB classes derived from the above listed classes Any CMDB classes derived from the above listed classes

#### 1.2 Subscription Unit Defined Ratios

##### Each Managed IT Resource Type defined in Section 1.1 will be counted towards a

##### Subscription Unit based on a predefined ratio of Subscription Unit to Managed IT Resource

##### per the table below:

##### Managed IT Resource Type

##### Subscription Unit: Managed IT

##### Resource Ratio

##### Server 1 : 1

##### PaaS Resource 1 : 3

##### Container 1 : 3

##### Unresolved Monitored Object 1 : 1

##### End User Computing Devices 1 : 4

##### IoT Devices 1 : 40

##### Networking Device 1 : 25

##### Networking Devices Advanced 1 : 25


