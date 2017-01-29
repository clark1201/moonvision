use CGI;
use DBI;
my $cgi = CGI->new;
my $id = $cgi->param("accountid");
my $account = $cgi->param("account");
my $dbh = DBI->connect("DBI:mysql:database=hdm174585245_db;host=hdm174585245.my3w.com;port=3306",  
  "hdm174585245", "hmw223410") or die $DBI::errstr;
print "Content-type: text/plain\n\n";
# my $statement = qq{select a.id as accountid, b.id as bookid, b.book_time, b.book_am_pm, b.detail, b.create_time, b.order_status, b.order_id from booking as b inner join account as a where a.tel=? and a.id=?};
my $statement = qq{select a.id as accountid, b.id as bookid, b.book_time, b.book_am_pm, b.detail, b.create_time, b.order_status, b.order_id, b.type from booking as b inner join account as a on b.account_id=a.id where a.username=? and a.id=?};
my $sth = $dbh->prepare($statement) or die $dbh->errstr;
$sth->execute($account, $id) or die $sth->errstr;
my $str = "[";
while (@data = $sth->fetchrow_array()) {
  my $accountid = $data[0];
  my $bookid = $data[1];
  my $book_time = $data[2];
  my $book_am_pm = $data[3];
  my $detail = $data[4];
  my $create_time = $data[5];
  my $order_status = $data[6];
  my $order_id = $data[7];
  my $type = $data[8];
  $str = $str."{\"account_id\":\"$accountid\", \"bookid\":\"$bookid\", \"book_time\":\"$book_time\", \"book_am_pm\":\"$book_am_pm\", \"detail\":\"$detail\", \"create_time\":\"$create_time\", \"order_status\":\"$order_status\", \"order_id\":\"$order_id\", \"type\":\"$type\"},";
}
my $str_len = length($str);
if($str_len-1>0){
  $str = substr($str, 0 , ($str_len-1));
}
$str = $str."]";
print $str;
$sth->finish();
$dbh->disconnect;