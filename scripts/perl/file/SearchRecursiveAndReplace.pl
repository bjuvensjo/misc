# This script search files recursively and performs replacements within them.
# Make changes as needed to variables and codelines as described below.

use File::Copy;
use File::Find;
use strict;

my $backup = 1; # Save backup of updated file in <fileName>.backup if not 0
my @directoriesToSearch = ("./src"); # The list of directories in which to recursively search for files, e.g. ("src/controller", "src/model");
# For the file filter to use when searching for files, make changes to codeline if (-f && /\.java$/)
# For what to find in file and the replacement, make changes to codeline s/im(port)/de\1/g


find(\&wanted, @directoriesToSearch);

sub wanted {
    if (-f && /\.java$/) { # The file filter to use when searching for files
        my $newFile = $_;
        my $backupFile = "$_.backup";
        move($newFile, $backupFile) || die "File $newFile cannot be moved: $!";
        open BACKUP, $backupFile || die "File $backupFile cannot be opened: $!";
        open NEWFILE, ">$newFile" || die "File $newFile cannot be opened: $!";
        while (<BACKUP>) {
            s/im(port)/de\1/g; # What to find in file and what to replace with
            print NEWFILE $_;
        }
        close NEWFILE;
        close BACKUP;
        unless ($backup) {
            unlink($backupFile) || die "Can not unlink $backupFile: $!" ;
        }
    }
}
