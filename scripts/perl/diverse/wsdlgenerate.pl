$theDir = "../src/messages/";
opendir MYDIR, $theDir;
@contents = grep !/^\.\.?$/, readdir MYDIR;
closedir MYDIR;

foreach $listItem (@contents) {
	$listItem =~ s/.xsd//;
	print $listItem . "\n";
	
	open SF, "Template.wsdl";
	open TMP, ">tmp/$listItem.wsdl";
	while ( <SF> ) {
	  s/Template/$listItem/g;
  	  print TMP $_;	
	}

	close TMP;
	close SF;	
}


 

