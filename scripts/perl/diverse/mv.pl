use File::Copy;
use strict;

#my $theDir = "E:/My Music/iTunes/iTunes Books/John Grisham/Den oskyldige mannen";
my $theDir = "E:/My Music/iTunes/iTunes Books/Henning Mankell/Italienska skor";
opendir MYDIR, $theDir;
my @files = grep /\.mp3$/, readdir MYDIR;
closedir MYDIR;

foreach my $file (@files) {
    my ($dir, $newfile, $extension) = ($file =~ /.*([0-9]{2})\.([0-9]{2})[^.]+(.*)/);
    mkdir "$theDir/$dir";
    move("$theDir/$file", "$theDir/$dir/$newfile$extension") or die "File cannot be copied.";
    print "$theDir/$file\n";
    print "$theDir/$dir/$newfile$extension\n\n";
}

print "Done!";


