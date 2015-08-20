my $url = 'https://internetbank.swedbank.se/';

use LWP::Simple;
my $content = get $url;
die "Couldn't get $url" unless defined $content;

# Then go do things with $content, like this:

print $content;
