use CGI;
use DBI;
my $cgi = CGI->new;
my $tel = $cgi->param("tel");
my $pwd = $cgi->param("pwd");
my $captcha = $cgi->param("captcha");
my $dbh = DBI->connect("DBI:mysql:database=hdm174585245_db;host=hdm174585245.my3w.com;port=3306",  
  "hdm174585245", "hmw223410") or die $DBI::errstr;
print "Content-type: text/plain\n\n";
my $statement = qq{select id, username, tel, address, create_time from account where tel=? and password=?};
my $sth = $dbh->prepare($statement) or die $dbh->errstr;
$sth->execute($tel, $pwd) or die $sth->errstr;
my $str = "{";
while (@data = $sth->fetchrow_array()) {
  my $id = $data[0];
  my $username = $data[1];
  my $tel = $data[2];
  my $address = $data[3];
  my $create_time = $data[4];
  $str = $str."\"id\":\"$id\", \"username\":\"$username\", \"tel\":\"$tel\", \"address\":\"$address\", \"create_time\":\"$create_time\"";
}
$str = $str."}";
print $str;
$sth->finish();
$dbh->disconnect;