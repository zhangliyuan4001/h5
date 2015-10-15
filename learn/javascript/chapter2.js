(function($){
    $(function(){

        function canvasFun(){
            /*测试浏览器是否支持canvas*/
            try {
                document.createElement("canvas").getContext("2d");
                document.getElementById("suport").innerHTML = "";
            } catch(e){
                document.getElementById("suport").innerHTML = "您的浏览器不支持";
            }

            var ca = document.getElementById("ca");
            var context = ca.getContext("2d");

            // context.beginPath();
            // context.moveTo(70,140);
            // context.lineTo(140,70);

            // context.stroke();


            // context.save();
            // context.translate(70,140);

            // context.beginPath();
            // context.moveTo(0,0);
            // context.lineTo(70,-70);

            // context.stroke();
            // context.restore();

            context.drawImage(img,0,0,740,302);

            context.save();

            context.translate(-10,350);
            context.beginPath();

            //第一条曲线向右上方

            context.moveTo(0,0);
            context.quadraticCurveTo(170,-50,260,-190);

            //第二条曲线向右下方
            context.quadraticCurveTo(310,-250,410,-250);

            context.strokeStyle = "#663300";
            context.lineWidth = 20;

            context.stroke();
            context.restore();

            context.save();
            context.translate(50,230);
            drowTree(context);
            context.restore();

            context.save();
            context.translate(70,230);
            drowTree(context);
            context.restore();

            context.save();
            context.translate(90,240);
            drowTree(context);
            context.restore();

            context.save();
            context.translate(130,250);
            drowTree(context);
            context.restore();

            context.save();
            context.translate(30,250);
            drowTree(context);
            context.restore();



            context.save();
            context.translate(260,500);
            drowTree(context);
            context.restore();

            context.save();
            context.translate(360,500);
            context.scale(2,2);
            drowTree(context);
            context.restore();

            context.save();
            context.font = '60px impact';
            context.fillStyle = "#996600";
            context.textAlign = 'center';
            context.shadowColor = 'rgba(0,0,0,0.2)';
            context.shadowOffsetX = 15;
            context.shadowOffsetY = -10;
            context.shadowBlur = 2;
            context.fillText('Happy Trails!',200,60,400);
            context.restore();






        }

        function drowTree(context){
            var truckGradient = context.createLinearGradient(-5,-50,5,-50);
            truckGradient.addColorStop(0,'#663300');
            truckGradient.addColorStop(0.4,'#996600');
            truckGradient.addColorStop(1,'#552200');

            context.fillStyle = truckGradient;
            context.fillRect(-5,-50,10,50);


            var canopyShadow = context.createLinearGradient(0,-50,0,0);
            canopyShadow.addColorStop(0,'rgba(0,0,0,0.5)');
            canopyShadow.addColorStop(0.2,'rgba(0,0,0,0.0)');

            context.fillStyle = canopyShadow;
            context.fillRect(-5,-50,10,50);


            createCanopyPath(context);

            context.lineWidth = 4;
            context.lineJoin = "round";
            context.strokeStyle = "#663300";

            context.stroke();

            context.fillStyle = "#339900";
            context.fill();




            context.save();

            context.transform(1,0,-0.5,1,0,0);
            context.scale(1,0.6);
            context.fillStyle = 'rgba(0,0,0,0.2)';
            context.fillRect(-5,-50,10,50);

            createCanopyPath(context);

            context.fill();
            context.restore();


        }
        function createCanopyPath(context){

            context.beginPath();
            context.moveTo(-25,-50);
            context.lineTo(-10,-80);
            context.lineTo(-20,-80);
            context.lineTo(-5,-110);
            context.lineTo(-15,-110);

            context.lineTo(0,-140);

            context.lineTo(15,-110);
            context.lineTo(5,-110);
            context.lineTo(20,-80);
            context.lineTo(10,-80);
            context.lineTo(25,-50);

            context.closePath();



        }



        var img = new Image();
        img.src = "../images/img.jpg";

        img.onload = function(){
            canvasFun();
        }

        var points = {},
            SCALE = 3,
            x = -1,
            y = -1;

        function loadDemo() {
            document.getElementById("resetButton").onclick = reset;
            var canvas = document.getElementById("heatamp");

            var context = canvas.getContext("2d");

            context.globalAlpha = 0.2;
            context.globalCompositeOperation = 'lighter';

            function sample(){
                if(x != -1){
                    addToPoint(x,y);
                }
                setTimeout(sample,1);
            }

            canvas.onmousemove = function(e){
                x = e.clientX - e.target.offsetLeft;
                y = e.clientY - e.target.offsetTop;

                addToPoint(x,y);
            }


            sample()

            function reset(){
                points = {};
                context.clearRect(0,0,1000,1000);
                x=-1;
                y=-1;
            }

            function getColor(intensity){
                var colors = ['#072933','#2E4045','#8C593B','#B2814E','#FAC268','#FAD237'];
                return colors|Math.floor(intensity);
            }

            function drawPoint(x,y,radius){

                context.fillStyle = getColor(radius);
                radius = Math.sqrt(radius)*6;

                context.beginPath();
                context.arc(x,y,radius,0,Math.PI*2,true);

                context.closePath();
                context.fill();
            }

            function addToPoint(x,y){
                x = Math.floor(x/SCALE);
                Y = Math.floor(y/SCALE);
                if(!points[[x,y]] ){
                    points[[x,y]] = 1;
                }else if(points[[x,y]] == 10){
                    return
                }else{
                    points[[x,y]]++
                }
                drawPoint(x*SCALE,y*SCALE,points[[x,y]])
            }


        }


        loadDemo()














    });
})(jQuery);