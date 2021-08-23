<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css?v=<?php echo time(); ?>">
    <title>Home</title>
</head>
    <nav>
        <h1>Binance API Queries!</h1>
        <h1 id="msg"></h1>
    </nav>
    <script>
        // Add new symbols here
        const symbols = ['ada', 'vet', 'btc', 'eth', 'xvs','luna','doge','ltc','avax', 'waves','sushi','cake'];

        symbols.forEach(symbol => {
            parentDiv = document.createElement('div');
            parentDiv.className = "stock-container";
            
            childDiv = document.createElement('div');
            parentDiv.appendChild(childDiv);

            heading = document.createElement('h2');
            heading.innerText = symbol;
            childDiv.appendChild(heading);  

            element = document.createElement('p');
            element.id = symbol;
            element.innerText = "-----";
            childDiv.appendChild(element);           

            element = document.createElement('p');
            element.innerText = "24h High: ";
            element.id = symbol + "high";
            childDiv.appendChild(element); 

            element = document.createElement('p');
            element.id = symbol + "low";
            element.innerText = "24h Low";
            childDiv.appendChild(element); 

            element = document.createElement('p');
            element.id = symbol + "-coins";
            element.innerHTML = "Coins: ---";
            childDiv.appendChild(element); 

            document.body.appendChild(parentDiv);
        });
    </script>
    <script src="app.js?v=<?php echo time(); ?>"></script>
    <?php
        $command = escapeshellcmd('python binance-api.py');
        $output = shell_exec($command);
        echo $output;
    ?>
</body>
</html>