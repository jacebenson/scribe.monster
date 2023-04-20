## Effective February 2 , 2023

###### © 2023 ServiceNow, Inc.

###### trademarks of ServiceNow, Inc. in the United States and/or other countries. Other company and product names may be trademarks of the respective

# Telecommunication Service Operations

# Management –

# ServiceNow Subscription Unit Overview


##### Effective February 2 , 2023

###### © 2023 ServiceNow, Inc.

###### trademarks of ServiceNow, Inc. in the United States and/or other countries. Other company and product names may be trademarks of the respective

## Table of Contents

#### 1. Telecommunication Service Operations Management .................................................................. 3

#### 1.1. Managed Telecommunications Resource Types ....................................................................... 3

#### 1.2. Subscription Unit Defined Ratios ................................................................................................... 4


###### © 2023 ServiceNow, Inc.

###### trademarks of ServiceNow, Inc. in the United States and/or other countries. Other company and product names may be trademarks of the respective

### 1. Telecommunication Service Operations Management

### 1.1. Managed Telecommunications Resource Types

#### “ Server ” is any physical or virtual server that is represented as a

#### configuration item (“CI”) in a CMDB table listed below and

#### managed by a Telecommunication Service Operations

#### Management ( “TS OM ” ) application.

#### “ PaaS Resource ” is any cloud-based platform service represented as

#### a CI in a CMDB table listed below and managed by a TSOM

#### application.

#### “ Container” is any operating system-level virtualization represented

#### as a CI in a CMDB table listed below and managed by a TSOM

#### application.

#### “ Networking Devices ” is any networking equipment that is

#### represented as a CI in a CMDB table listed below and managed

#### by a TSOM application.

#### “ Networking Devices Advanced ” is any networking equipment that

#### is represented as a CI in a CMDB table listed below and

#### managed by a TSOM application.

#### “End User Computing Device” is any physical or virtual

#### computing device that is not defined as another Managed IT

#### Resource Type and has an Agent Client Collector installed.

#### Agent Client Collector is a ServiceNow agent that is

#### installed on infrastructure components. End User Computing

#### Devices are represented as a CI in a CMDB table listed

#### below and managed by an TSOM application.

#### “IoT Device” is any physical or virtual device represented as a CI

#### in a CMDB table listed below and managed by a TSOM

#### application.


###### © 2023 ServiceNow, Inc.

###### trademarks of ServiceNow, Inc. in the United States and/or other countries. Other company and product names may be trademarks of the respective

#### “ Unresolved Monitored Object ” is any Telecommunications

#### Resource for which the TSOM Application receives an event or

#### performance metric which is not represented as a CI in a

#### CMDB table. Unresolved Monitored Objects are recorded in the

#### “em_unique_nodes” table with the “type” field equal to

#### “unknown”.

##### Servers PaaS Resources Containers

 cmdb_ci_server cmdb_ci_cloud_appserver cmdb_ci_oslv_container cmdb_ci_vm_instance cmdb_ci_cloud_database^ Any CMDB classes derived from the above listed classes cmdb_ci_ucs_rack_unit cmdb_ci_dynamodb_table cmdb_ci_ucs_blade cmdb_ci_cloud_directory Any CMDB classes derived from the above listed classes cmdb_ci_cloud_gateway cmdb_ci_cloud_messaging_service cmdb_ci_cloud_webserver Any CMDB classes derived from the above listed

##### Networking

##### Devices

##### IoT Device Networking

##### Devices

##### Advanced

##### End User

##### Computing

##### Devices

 cmdb_ci_netgear cmdb_ci_iot cmdb_ci_equipme nt_holder Cmdb_ci_com puter cmdb_ci_networ k_function cmdb_ci_converged_infra cmdb_ci_ni_equip ment_holder Any CMDB classes derived from the above listed classes and defined as not another Managed Telecommunic ations Resource Type Any CMDB classes derived from the above listed classes Any CMDB classes derived from the above listed classes cmdb_ci_ni_interf ace cmdb_ci_site cmdb_ci_ni_site cmdb_ci_ni_physic al_link cmdb_ci_ni_logic al_path cmdb_ci_ni_telco _equipment Any CMDB classes derived from the above listed classes


###### © 2023 ServiceNow, Inc.

###### trademarks of ServiceNow, Inc. in the United States and/or other countries. Other company and product names may be trademarks of the respective

### 1.2. Subscription Unit Defined Ratios

#### Each Managed Telecommunications Resource Type defined in

#### Section 1.1 will be counted towards a Subscription Unit based

#### on a predefined ratio of Subscription Unit to Managed

#### Telecommunications Resource per the table below:

#### Managed Telecommunications

#### Resource Type

#### Subscription Unit: Managed

#### Telecommunications Resource Ratio

#### Server 1 : 1

#### PaaS Resource 1 : 3

#### Container 1 : 3

#### Networking Devices 1 : 25

#### Networking Devices Advanced 1 : 25

#### Unresolved Monitored Object 1 : 1

#### IoT Device 1: 40

#### End User Computing Devices 1 : 4


