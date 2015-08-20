my $url = 'http://www.dn.se';

use LWP::Simple;
my $content = get $url;
die "Couldn't get $url" unless defined $content;

# Then go do things with $content, like this:

if($content =~ m/ekonomi/i) {
    print "They're talking about ekonomi today on $url!\n";
} else {
    print "They're NOT talking about ekonomi today on $url!\n";
}
