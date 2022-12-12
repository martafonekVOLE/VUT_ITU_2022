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

        unset($_POST['name']);
        unset($_POST['category']);
        unset($_POST['portions']);
        unset($_POST['img']);
        unset($_POST['submitted']);
    }

    try
    {
        //TODO nastavit ukládání IMGs
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

        $a = array('id'=>"$maxID", 'name'=>$name, 'category'=>$category, 'portions'=>$portions, 'photo'=>$img);

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
    }
    catch(Exception $e)
    {
        echo "Error has occured while inserting to JSON.";
        redirect('createRecipe.html');
    }
    
    redirect('index.html');

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
