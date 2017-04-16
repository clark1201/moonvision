use CGI;
use DBI;
my $cgi = CGI->new;
my $id = $cgi->param("accountid");
my $account = $cgi->param("account");
my $dbh = DBI->connect("DBI:mysql:database=hdm174585245_db;host=hdm174585245.my3w.com;port=3306",  
  "hdm174585245", "hmw223410") or die $DBI::errstr;
print "Content-type: text/plain\n\n";
# my $statement = qq{select a.id as accountid, a.username, a.tel, a.address, b.id as bookid, b.book_time, b.book_am_pm, b.detail, b.create_time, b.order_status, b.order_id, b.type from booking as b inner join account as a on b.account_id=a.id where b.status=1 and b.order_status<>2};
my $statement = qq{select a.id as accountid, a.username, a.tel, a.address, b.id as bookid, b.book_time, b.book_am_pm, b.detail, b.create_time, b.order_status, b.order_id, b.type from booking as b inner join account as a on b.account_id=a.id where b.status=1};
my $sth = $dbh->prepare($statement) or die $dbh->errstr;
$sth->execute() or die $sth->errstr;
my $str = "[";
while (@data = $sth->fetchrow_array()) {
  my $accountid = $data[0];
  my $username = $data[1];
  my $tel = $data[2];
  my $address = $data[3];
  my $bookid = $data[4];
  my $book_time = $data[5];
  my $book_am_pm = $data[6];
  my $detail = $data[7];
  my $create_time = $data[8];
  my $order_status = $data[9];
  my $order_id = $data[10];
  my $type = $data[11];
  $str = $str."{\"account_id\":\"$accountid\", \"username\":\"$username\" , \"tel\":\"$tel\" , \"address\":\"$address\", \"bookid\":\"$bookid\", \"book_time\":\"$book_time\", \"book_am_pm\":\"$book_am_pm\", \"detail\":\"$detail\", \"create_time\":\"$create_time\", \"order_status\":\"$order_status\", \"order_id\":\"$order_id\", \"type\":\"$type\"},";
}
my $str_len = length($str);
if($str_len-1>0){
  $str = substr($str, 0 , ($str_len-1));
}
$str = $str."]";
print $str;
$sth->finish();
$dbh->disconnect;