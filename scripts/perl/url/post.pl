#!/usr/bin/perl -w

use strict;

use LWP::UserAgent;
use HTTP::Request::Common;

my $userAgent = LWP::UserAgent->new(agent => 'perl post');

my $message = "{\"customerId\":\"197903081029\"}";

my $response = $userAgent->request(POST 'http://localhost:8080/enterprise-services/deposit/getdepositaccounts/v201401',
                                   Content_Type => 'application/json',
                                   Cookie => 'user-session=FAKE-USER-SESSION-TOKEN',
                                   Content => $message);

print $response->error_as_HTML unless $response->is_success;

print $response->as_string;
