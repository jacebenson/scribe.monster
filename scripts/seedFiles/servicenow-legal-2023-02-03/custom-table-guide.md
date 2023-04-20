 © 2022 ServiceNow, Inc.

# ServiceNow Custom Table Guide


 © 2022 ServiceNow, Inc.

## Custom Table Guide

### 1. Definitions

 1.1 “ Custom Table ” means any non-ServiceNow provided table created or installed by or on behalf of Customer on the ServiceNow platform and used for any purpose, including the creation of a custom application, unless such table is specifically exempt.

 1.2 “ Custom Table Fields ” means any non-ServiceNow provided field created by on behalf of Customer within a Custom Table.

 1.3 “ App Engine Starter” refers to the Now Platform capabilities (Studio, Mobile Studio, Guided App Creator, Delegated Development) along with a limited number of Custom Tables included as an explicit entitlement with the purchase of a subscription product.

 1.4 “ Exempt Tables ” means a Customer created table that is not counted as a Custom Table. Exempted tables are listed in Section 2 below.

### 2. Exempt Tables

 2.1 Table Extensions

 Customer is entitled to extend each of the below ServiceNow provided tables up to one thousand times. Extending any of the below ServiceNow tables more than one thousand times requires a subscription to either an App Engine product or any ServiceNow product that includes the App Engine Starter entitlement.

 cmdb_[*] sc_service_fulfillment_step sys_report_import_table_parent

 cmn_location scheduled_data_import sys_transform_script

 cmn_schedule_condition sf_state_flow sys_transform_map

 dl_definition sys_auth_profile sys_user_preference

 dl_matcher sys_dictionary sysauto

 kb_knowledge sys_filter syslog

 ml_ci_ml sys_hub_action_type_base

 sc_cat_item_delivery_task sys_import_set_row

 *Any ServiceNow table with the prefix cmdb_


© 2022 ServiceNow, Inc.

 2.2 Table Type

 The following types of tables are exempted.

 2.2.1. Many to Many Tables : Many to many tables that are registered in the m2m_table field in the sys_m2m table. These tables are restricted to three (3) custom fields in addition to the standard fields created by the system.

 2.2.2. Remote Tables: Tables marked as a remote table in the dictionary.

 2.2.3. Archive Tables: Tables archived tables; tables created by the ServiceNow data archiving process (starting with ar_).

 2.2.4. Rotated Table Shards : Table shards created as by the ServiceNow table rotation process. Shards of rotated tables as listed in sys_table_rotation_schedule.

### 3. App Engine Starter and Exempt Table Field Limitations

 Each App Engine Starter and Exempt Table is limited in the number of Custom Table Fields that may be created by the Customer. The number of Custom Table Fields entitled on each Custom Table is determined by the App Engine Package or Table Type as indicated below.

 Table Type Maximum Custom Table Fields

 App Engine Starter Tables 50

Exempt Tables (^50)

### 4. ServiceNow Store Downloads

 Free Partner Built Store Downloads: Free Store features and applications built by ServiceNow partners require the Customer to have entitlement for the number of included Custom Tables, either through their App Engine Starter Custom Tables that are included within their ServiceNow products or through an App Engine subscription product.

 Free Store Applications of type “Integration” are exempted from the Custom Table count and do not require Custom Table entitlement unless the out of the box integration is expanded with the creation of additional Custom Tables.

 Paid Partner Built Store Downloads: The included Out of the Box Paid Store features and applications build by ServiceNow partners include embedded entitlements for the Custom Tables included. Paid partner-built apps, transacted on the ServiceNow Store with a contract value greater than zero dollars ($0), do not consume Custom Tables and require no additional Custom Table entitlement, unless the out of the box application is expanded with the creation of additional Custom Tables.


© 2022 ServiceNow, Inc.

 ServiceNow Built Store Downloads : The included Out of the Box Store features and applications built by ServiceNow do not require Custom Table entitlement unless the out of the box application is expanded with the creation of additional Custom Tables.


