#!/bin/bash

composer network install --card PeerAdmin@hlfv1 --archiveFile smart-attest@0.0.3-deploy.76.bna
composer network start --networkName smart-attest --networkVersion 0.0.3-deploy.76 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
composer card delete --card admin@smart-attest
composer card import --file networkadmin.card
composer network ping --card admin@smart-attest

composer-rest-server -c admin@smart-attest -w true -n never