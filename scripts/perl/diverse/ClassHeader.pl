#!/usr/bin/perl
use File::Copy;
use File::Find;

@okHeader = ("/*\n", " * This is the Ok header.\n", " */\n");
$okHeader = @okHeader; # The length of the @okHeader list
@directories_to_search = ("./src");

find(\&wanted, @directories_to_search);

sub wanted {
    if (/java$/) {
	$fileName = $_;
	$ok = 1;
	$inHeader = 1;
	$count = 0;
	
	$outFile = $fileName.".tmp";
	open OUT, "> $outFile" or die "Can't open $outFile : $!";
	
	open F, "< $_";
	while (<F>) {
	    if ($inHeader) {
		if (/^p/) { # How safe is this?
		    $inHeader = 0;
		    $ok = $ok && $count == $okHeader;
		    unless ($ok) {
			print "Updating ".$fileName."\n";
			print OUT @okHeader;
			print OUT $_;
		    } else {
			print $fileName." is OK\n";
			close F;
			close OUT;
			unlink($outFile) or die "Can't delete $outFile : $!";            
			return; # Work is done...
		    }
		} elsif ($ok) {
		    if ($count < $okHeader && $_ eq $okHeader[$count]) {
			$count = $count + 1;
		    } else {
			$ok = 0;
		    }
		}
	    } else {
		print OUT $_;
	    }
	}
	close F;
	close OUT;
	move($outFile, $fileName) or die "Can't move $outFile to $fileName : $!";
    }
}
