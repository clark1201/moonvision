use CGI;
use DBI;
my $cgi = CGI->new;
my $dbh = DBI->connect("DBI:mysql:database=hdm174585245_db;host=hdm174585245.my3w.com;port=3306",  
  "hdm174585245", "hmw223410") or die $DBI::errstr;
print "Content-type: text/plain\n\n";
my $statement = qq{select id, book_time, book_am_pm, detail, account_id, create_time, type from booking where book_time>now()};
my $sth = $dbh->prepare($statement) or die $dbh->errstr;
$sth->execute() or die $sth->errstr;
my $str = "[";
while (@data = $sth->fetchrow_array()) {
  my $id = $data[0];
  my $book_time = $data[1];
  my $book_am_pm = $data[2];
  my $detail = $data[3];
  my $account_id = $data[4];
  my $create_time = $data[5];
  my $type = $data[6];
  $str = $str."{\"id\":\"$id\", \"book_time\":\"$book_time\", \"book_am_pm\":\"$book_am_pm\", \"detail\":\"$detail\", \"account_id\":\"$account_id\", \"create_time\":\"$create_time\", \"type\":\"$type\"},";
}
my $str_len = length($str);
if($str_len-1>0){
  $str = substr($str, 0 , ($str_len-1));
}
$str = $str."]";
print $str;
$sth->finish();
$dbh->disconnect;