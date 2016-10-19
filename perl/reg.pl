use CGI;
use DBI;
my $cgi = CGI->new;
my $tel = $cgi->param("tel");
my $pwd = $cgi->param("pwd");
my $username = $cgi->param("username");
my $address = $cgi->param("address");
my $captcha = $cgi->param("captcha");
my $dbh = DBI->connect("DBI:mysql:database=hdm174585245_db;host=hdm174585245.my3w.com;port=3306",  
  "hdm174585245", "hmw223410") or die $DBI::errstr;
print "Content-type: text/plain\n\n";
my $str = "{";
my $statement1 = qq{select count(id) as count from account where tel=?};
my $sth1 = $dbh->prepare($statement1) or die $dbh->errstr;
$sth1->execute($tel) or die $sth1->errstr;
my $count = "0";
# print "count, $count";
while (@data = $sth1->fetchrow_array()) {
  $count = $data[0];
}
$sth1->finish();
if ($count == "0"){
  # print "count, $count";
  my $statement = qq{insert into account (tel, password, username, address) values (?,?,?,?)};
  my $sth = $dbh->prepare($statement) or die $dbh->errstr;
  $tel = "$tel";
  $pwd = "$pwd";
  $username = "$username";
  $address = "$address";
  $sth->execute($tel, $pwd, $username, $address) or die $sth->errstr;
  $str = $str."\"err\":0";
  $sth->finish();
}
else{
  # print "count, $count";
  $str = $str."\"err\":1,\"msg\":\"该手机号已经被注册了\"";
}
# print "$str";
$str = "$str}";
print $str;
$dbh->disconnect;