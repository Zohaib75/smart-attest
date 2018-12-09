#!/bin/bash

composer network install --card PeerAdmin@hlfv1 --archiveFile smart-attest.bna
composer network start --networkName smart-attest --networkVersion 0.0.3-deploy.7 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
composer card import --file networkadmin.card
composer network ping --card admin@smart-attest
