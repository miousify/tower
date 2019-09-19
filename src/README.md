
##Introduction
This module defines the functionality to monitor and spin up miousify 
sites. 
All sites basically run as services with a specified number of task for 
each site based on the plan selected.

Basic workflow is as follow, 
When the tower boots up, it check to see the sites scheduled to be up and 
running, checks to see if thoses sites are actually running on our docker 
swam. If its not running .i.e as a service, the tower authomatically spinns
it up.

On a daily basis, the tower iterates all sites token to see it its expired, 
if a token has expires, before it does, it sends notification to emails attached 
to such token informing them that their servers would soon be shut down, except
the make changes or renew them. When a token is finnaly expired, it autmatically 
kills the services, and remove such sites from the list of sites to be kept running.

To startup a sites service, a notification is sent to the tower, along with required information
. Business emai, plan type, store id, status
it uses this details to schedule jobs for this service that would be monitored.

When this job is added to the list of jobs, the service for this job is spined up
thus making it accessible on the web, when this is done, it notifies the email
what has just been done, and notifies the success of the job.

It is important to note that, changes would be made to miousify-store-server-image
on a regular basis, when changes are mode, the tower could be notified to,
reboot all services to meet up to the  new image changes. 
Before this is done, all emails attached would be notified.