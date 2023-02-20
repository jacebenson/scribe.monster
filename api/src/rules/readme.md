   *  Verify table-specific rules
   *  Verify that read rules are executed when a read is done
   *  Verify that business rules for create, update, and delete work for both "before" and "after" settings
   *
   *  Verify that the active flag turns the rule on and off
   *  Verify that if there are multiple rules for the same table they run in the correct order based on the "order" column
   *  Verify that if there is a condition on a business rule, it is evaluated correctly before the business rule script is run or not run
   *  Verify the behavior of current.setAbortAction(true) for a business rule that runs before a database operation - make sure the DB action is in fact aborted
   *  Verify that if bad script exists for a business rule, the script error is reported appropriately (no silent failure)