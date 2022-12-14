<!--
    File: editJson2.php

    Author: David Konečný (xkonec83)
-->

<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function save_uploaded_image()
{
    if (isset($_FILES['img'])) {
        $target_dir = __DIR__ . "/img/";
        $target_file = $target_dir . basename($_FILES["img"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        if (isset($_POST["submit"])) {
            $check = getimagesize($_FILES["img"]["tmp_name"]);
            if ($check !== false) {
                $uploadOk = 1;
            } else {
                $uploadOk = 0;
            }
        }
        if (file_exists($target_file)) {
            return "./img/" .$_FILES["img"]["name"];
        }
        if ($_FILES["img"]["size"] > 50000000) {
            $uploadOk = 0;
        }
        if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
            $uploadOk = 0;
        }
        if ($uploadOk == 0) {
            return -2;
        } else {
            if (!move_uploaded_file($_FILES["img"]["tmp_name"], $target_file)) {
                return -3;
            } else {
                return "./img/" .$_FILES["img"]["name"];
            }
        }
    }
    return -1;
}

if (isset($_POST['delete']))
    {
        $id = $_POST['id'];

        try
        {            
            $data = file_get_contents('recipe.json');
            $json_arr = json_decode($data, true);

            $i = 0;

            foreach ($json_arr as $element)
            {
                if ($element['id'] == $id)
                {
                    unset($json_arr[$i]);
                    echo "<h2>Recept byl odstraněn</h2>";
                }

                $i++;
            }

            $out = array_values($json_arr);
            file_put_contents('recipe.json', json_encode($out));
        }
        catch(Exception $e)
        {
            echo "Error has occured while inserting to JSON.";
            redirect('createRecipe.html');
        }
    }
    else
    {
        if (isset($_POST['submitted']))
        {
            $name = $_POST['name'];
            $category = $_POST['category'];
            $portions = $_POST['portions'];

            unset($_POST['name']);
            unset($_POST['category']);
            unset($_POST['portions']);
            unset($_POST['submitted']);
        }

        try
        {
            //TODO save_uploaded_image() vrátí po uložení obrázku jeho název -> použít: $img = save_uploaded_image();
            $data = file_get_contents('recipe.json');
            $json_arr = json_decode($data, true);

            //$last_index = max($json_arr[0]['id']);
            //$last_index++;

            $maxID = 0;
            foreach($json_arr as $arrElement){
                if($arrElement["id"] > $maxID){
                    $maxID = $arrElement["id"];
                }
            }
            $maxID++;
            $out_img = save_uploaded_image();
            if($out_img == -1 || $out_img == -2 || $out_img == -3){
                $out_img = "default.jpg";
            }
            $a = array('id'=>"$maxID", 'name'=>$name, 'category'=>$category, 'portions'=>$portions, 'photo'=>$out_img);
            $j = 1;
            $ingredients = array();
            $descs = array();

            
            foreach ($_POST as $key => $value)
            {
                $pattern = "/desc/i"; 
                $pattern2 = "/ingredients/i"; 
                if(preg_match($pattern, $key)){
                    array_push($descs, $value);
                }
                else if(preg_match($pattern2, $key)){
                    array_push($ingredients, $value);
                }
            }

            $in = array();


            for ($x = 0; $x < count($ingredients); $x+=3)
            {
                if ($ingredients[$x] === "")
                {
                    break;
                }
                //$a["ingredient_$j"] = [$ingredients[$x], $ingredients[$x + 1], $ingredients[$x + 2]];
                array_push($in, [$ingredients[$x], $ingredients[$x + 1], $ingredients[$x + 2]]);
                
                $j++;
            }

            $a["ingredients"] = $in;
            // array_push($a, $in);

            $in = array();
            $j = 1;


            for ($x = 0; $x < count($descs); $x+=3)
            {
                if ($descs[$x] === "")
                {
                    break;
                }
                //$a["ingredient_$j"] = [$ingredients[$x], $ingredients[$x + 1], $ingredients[$x + 2]];
                array_push($in, [$descs[$x], $descs[$x + 1], $descs[$x + 2]]);
                
                $j++;
            }

            $a["insctructions"] = $in;
            // array_push($a, $in);

            $json_arr[] = $a;

            file_put_contents('recipe.json', json_encode($json_arr));
            setcookie('id_favourite'.$maxID, $maxID, time()+3600*24*365);
        }
        catch(Exception $e)
        {
            echo "Error has occured while inserting to JSON.";
            redirect('createRecipe.html');
        }

        redirect('index.html');
    }

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

?>
