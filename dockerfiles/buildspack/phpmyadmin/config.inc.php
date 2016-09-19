<?php
require('./config.secret.inc.php');
/* Ensure we got the environment */
$vars = array(
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASS',
);
foreach ($vars as $var) {
    if (!isset($_ENV[$var]) && getenv($var)) {
        $_ENV[$var] = getenv($var);
    }
}
/* Arbitrary server connection */
$cfg['AllowArbitraryServer'] = true;

/* Figure out hosts */
/* Fallback to default linked */
$hosts = array('db');
/* Set by environment */
if (!empty($_ENV['DB_HOST'])) {
    $hosts = array($_ENV['DB_HOST']);
}
/* Server settings */
for ($i = 1; isset($hosts[$i - 1]); $i++) {
    $cfg['Servers'][$i]['host'] = $hosts[$i - 1];
    if (isset($_ENV['DB_PORT'])) {
        $cfg['Servers'][$i]['port'] = $_ENV['DB_PORT'];
    }
    if (isset($_ENV['DB_USER'])) {
        $cfg['Servers'][$i]['auth_type'] = 'config';
        $cfg['Servers'][$i]['user'] = $_ENV['DB_USER'];
        $cfg['Servers'][$i]['password'] = isset($_ENV['DB_PASS']) ? $_ENV['DB_PASS'] : null;
    } else {
        $cfg['Servers'][$i]['auth_type'] = 'cookie';
    }
    $cfg['Servers'][$i]['connect_type'] = 'tcp';
    $cfg['Servers'][$i]['compress'] = false;
    $cfg['Servers'][$i]['AllowNoPassword'] = false;
}
/* Uploads setup */
$cfg['UploadDir'] = '';
$cfg['SaveDir'] = '';