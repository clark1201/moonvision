use CGI;
use DBI;
my $cgi = CGI->new;
my $username = $cgi->param("username");
my $password = $cgi->param("password");
my $dbh = DBI->connect("DBI:mysql:database=hdm174585245_db;host=hdm174585245.my3w.com;port=3306",  
  "hdm174585245", "hmw223410") 
  or die $DBI::errstr;
print "Content-type: text/plain\n\n";
# my $statement = qq{SELECT id,username,password,tel,address,create_time FROM account WHERE username=? and password=?};
my $statement = qq{SELECT * FROM account};
my $sth = $dbh->prepare($statement) or die $dbh->errstr;
# $sth->execute($username, $password) or die $sth->errstr;
$sth->execute() or die $sth->errstr;
# my ($userID) = $sth->fetchrow_array();
my ($userID) = $sth->rows;
# print "Number of rows found : ($userID)\n";
my $str = "[";
while (@data = $sth->fetchrow_array()) {
  my $id = $data[0];
  my $username = $data[1];
  my $password = $data[2];
  my $tel = $data[3];
  my $address = $data[4];
  my $create_time = $data[5];
  $str = $str."{\"id\":\"$id\", \"username\":\"$username\", \"tel\":\"$tel\", \"address\":\"$address\", \"create_time\":\"$create_time\"},";
}
my $str_len = length($str);
$str = substr($str, 0 , ($str_len-1));
$str = $str."]";
print $str;
$sth->finish();

# create a JSON string according to the database result
# my $json = ($userID) ? 
#   qq{{"success" : "login is successful", "userid" : "($userID)"}} : 
#   qq{{"error" : "username or password is wrong"}};
# print "$json\n";

# print "All Done!\n";