enhanced-alert <sub>A query ui plugin </sub>
==============
This plugin replaces browser dialog (alert, prompt, confirm) with new ones.

<h2>Usage</h2>
<h3>Alert</h3>
<code>$.ea.alert(message[,title[,icon]])</code>
<h5>Example:</h5>
<pre>$.ea.alert("I'm new",'Warning');</pre>
<h3>Confirm</h3>
<code>$.ea.confirm(message[, title[, callback[, icon]]]) </code>
<h5>Example:</h5>
 <pre>
$.ea.confirm('Are your over 18', 'Confirm please', function(r) {
    $.ea.alert(r)
})
</pre>
<h3>Prompt</h3>
<code>$.ea.prompt(message[, title[, callback[, icon]]])</code>
<h5>Example:</h5>
<pre>
$.ea.prompt('Where are your from ?', 'Answer please', function(r) {
    if (r) {
        alert('I love ' + r + '!')
    }
})
</pre>



Icon by http://www.icons-land.com/vista-base-software-icons.php
