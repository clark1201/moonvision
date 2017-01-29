use CGI;
use DBI;
my $cgi = CGI->new;
my $order_id = $cgi->param("order_id");
my $order_status = $cgi->param("order_status");
my $dbh = DBI->connect("DBI:mysql:database=hdm174585245_db;host=hdm174585245.my3w.com;port=3306",  
  "hdm174585245", "hmw223410") or die $DBI::errstr;
print "Content-type: text/plain\n\n";
my $statement = qq{update booking set order_status=? where order_id=?};
my $sth = $dbh->prepare($statement) or die $dbh->errstr;
$order_status = $order_status;
$order_id = "$order_id";
$sth->execute($order_status, $order_id) or die $sth->errstr;
# print $sth->rows;
print "1";
$sth->finish();
$dbh->disconnect;