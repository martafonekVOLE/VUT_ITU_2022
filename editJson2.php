<!--
    File: editJson2.php

    Author: David Konečný (xkonec83)
-->

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>
            Úprava receptu
        </title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
        <link href="custom.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    </head>
    <body class="bg-light" style="overflow-y: hidden;">
        <div class="container">
            <div class="row">
                <div class="col-sm-12" >
                    <h1 class="text-center">
                        Úprava receptu
                    </h1>
                </div>
            </div>



<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

    if (isset($_POST['submitted']))
    {
        $name = $_POST['name'];
        $category = $_POST['category'];
        $portions = $_POST['portions'];
        $img = $_POST['img'];
    }

    try
    {
        //TODO nastavit ukládání IMGs
        $data = file_get_contents('recipe.json');
        
        $json_arr = json_decode($data, true);
        $id = $_COOKIE['id'];

        $recipe = get_json_object($id, $json_arr);

        $name = $recipe['name'];
        $portions = $recipe['portions'];
        $img = $recipe['photo'];

    
        echo ("
            <div class='row'>
            <div class='col-sm-12'>
                <form method='post' action='editJson.php'>
                    <div class='mb-3'>
                        <label>Název pokrmu</label>
                        <input type='text' class='form-control' placeholder='Název' value='$name' required name='name'>
                    </div>
                    <div class='mb-3'>
                        <label>Počet porcí</label>
                        <input type='number' class='form-control' placeholder='Počet porcí' value='$portions' required name='portions'>
                    </div>
                    <div class='mb-3'>
                        <label>Katerogie jídla</label>
                        <select class='form-select' name='category' name='category' required>
                            <option selected>Vyberte kategorii</option>
                            <option value='Hlavní jídla'>Hlavní jídla</option>
                            <option value='Dezerty'>Dezerty</option>
                            <option value='Polévky'>Polévky</option>
                            <option value='Přílohy'>Přílohy</option>
                            <option value='Saláty'>Saláty</option>
                        </select>
                    </div>
                    <label>Ingredience</label> ");

                    $ingredients = $recipe['ingredients'];
                    $index = 1;

                    echo ("<div class='mb-3' id='auto-fill-content1'> </div> ");

                    foreach ($ingredients as $i)
                    {
                        echo "<input type='text' class='col-sm-5' placeholder='Jméno ingredience' value='$i[0]' name='ingredients".$index."1' id='ingredients".$index."1'>";
                        echo "<input type='number' class='col-sm-3' placeholder='Množství' value='$i[1]' name='ingredients".$index."2' id='ingredients".$index."2'>";
                        echo "<input type='text' class='col-sm-3' placeholder='Jednotka' value='$i[2]' name='ingredients".$index."3' id='ingredients".$index."3'>";
                        echo "<span class='col-sm-1' onclick='removeIngredient($index)'>&times;</span>";

                        $index++;
                    }

                    $instructions = $recipe['insctructions'];
                    $index = 1;

                    echo "<div class='mb-3' id='auto-fill-desc1'> </div>";

                    foreach ($instructions as $i)
                    {
                        echo "<input type='text' class='col-sm-5' placeholder='Název kroku' value='$i[0]' name='instructions".$index."1' id='instructions".$index."1'>";
                        echo "<input type='text' class='col-sm-3' placeholder='Popis' value='$i[1]' name='instructions".$index."2' id='instructions".$index."2'>";
                        echo "<input type='text' class='col-sm-3' placeholder='Čas provádění' value='$i[2]' name='instructions".$index."3' id='instructions".$index."3'>";
                        echo "<span class='col-sm-1' onclick='removeDesc($index)'>&times;</span>";

                        $index++;
                    }
                    
                    
                    echo ("
                    <label>Postup</label>

                    <div class='mb-3'>
                        <label>Nahrát fotografii</label>
                        <input type='file' class='form-control' value='$img' required name='img' accept='image/*'>
                    </div>
                    <div class='mb-3'>
                        <button type='submit' class='btn btn-primary'  name='submitted'>Vytvořit</button>
                    </div>
                </form>
            </div>
            <div class='col'></div>
        </div>
        
        ");

    
    }
    catch(Exception $e)
    {
        echo "Error has occured while inserting to JSON.";
        //redirect('createRecipe.html');
    }
    
    //redirect('index.html');

    function redirect($url)
    {
        $string = '
        <script type="text/javascript" src="main.js"></script>
        <script type="text/javascript">
        renderRecipes();
        window.localStorage.setItem("closeModal", 1);
        renderRecipes();
        </script>';

        echo $string;
    }

    function get_json_object($id, $array)
    {
        foreach($array as $object)
        {
            if($object['id'] == $id)
            {
                return $object;
            }
        }
    }
?>

                    </form>
                    
                <div class="col"></div>
            </div>
        </div>
        <script src="main.js"></script>
        <script src="formFieldManager.js"></script>
    </body>

</html>
