  class DAG {
      constructor(treeDivId,width,height,statusid){
          this.canvas =d3.select(treeDivId).append("svg")
              .attr("width",width)
              .attr("height",height);
          this.animDuration=200;
          this.tree = d3.layout.tree().size([400,400]);
          this.realdata=null;
          this.node_color = "#009973";
          this.highlight_color ="red";
          this.circle_radius="30px";
          this.edge_color = "#0d26e5";
          this.animDelay=5
          this.stateChangeDuration = 1000
          this.statusid = statusid
          this.animationComplete = true
      }
      GetAnimationDuration(){
          return this.animDuration
      }
      GetNodeColor(){
          return this.node_color
      }
      GetHighLightColor(){
          return this.highlight_color
      }
      GetEdgeColor(){
          return this.edge_color
      }
      GetCircleRadius(){
          return this.circle_radius
      }
      GetAnimationDelay(){
          return this.animDelay
      }

      GetStateChangeDuration(){
          return this.stateChangeDuration
      }


      SetStateChangeDuration(ms){
          this.stateChangeDuration = ms
      }
      SetAnimationDuration(ms){
          this.animDuration = ms
      }
      SetNodeColor(color){
          this.node_color = color
      }
      SetHighLightColor(color){
          this.highlight_color = color
      }
      SetEdgeColor(color){
          this.edge_color = color
      }
      SetCircleRadius(rad){
          this.circle_radius = rad
      }
      SetAnimationDelay(animdeley){
          this.animDelay = animdeley
      }


      sleep(timer){
          return new Promise(resolve => setTimeout(resolve,timer));
      }
      async Render(animationstate){

          for(let i = 0 ; i  < animationstate.length ; i++){
              if(i==0){
                  this.animationComplete=false
              }
              let   data = animationstate[i][0]
              let label = animationstate[i][1]
              let  popupDialogue = animationstate[i][2]
              let nodehighlighter = animationstate[i][3]
              // console.log(popupDialogue)
              var statusbar = document.getElementById(this.statusid);
              var status_data = document.getElementById(this.statusid).innerHTML;
              if(i==0){
                  status_data+="<br>"
              }
              if(popupDialogue!=""){
                  status_data += popupDialogue ;
                  statusbar.innerHTML = status_data;
              }
              statusbar.scrollTop = statusbar.scrollHeight;

              if(i==animationstate.length-1){
                  this.animationComplete=true
                  //  console.log(this.animationCompletes)
              }
              try {
                  this.RenderingProcessFactory(data,label,this.animDelay,nodehighlighter)
                  await this.sleep(this.stateChangeDuration);

              }
              catch(err) {

              }

          }


      }

      RenderingProcessFactory(data,key_to_highlight,animx,nodehighlighter){
          // console.log(data)
          d3.selectAll(".node").remove();
          d3.selectAll(".link").remove();

          let nodes = this.tree.nodes(data);

          let links = this.tree.links(nodes);
          let linker = this.canvas.append("g").attr("transform","translate(50,50)");
          let noder  = this.canvas.append("g").attr("transform","translate(50,50)");
          let diagonal = d3.svg.diagonal();

          let node = noder.selectAll(".node")
              .data(nodes)
              .enter()
              .append("g")
              .attr("class","node")
              .attr("transform",function(d){
                  return "translate("+d.x + "," + d.y +")";
              });

          node.append("circle")
              .attr("r",this.circle_radius)
              .attr("id",function(d){return "node-"+d.data})
              .attr("fill",this.node_color);

          node.append("text")
              .attr("dx",function(d){return -6})
              .attr("dy",function(d){return 6})
              .text(function(d){return d.data})
              .attr("fill","white");



          let edges = linker.selectAll(".link")
              .data(links)
              .enter()
              .append("path") //lime
              .attr("class","link")
              .attr("fill","none")
              .attr("stroke","#0d26e5")
              .attr("d",diagonal);

          d3.select("#node-"+key_to_highlight)
              .transition().duration(this.animDuration).delay(100)
              .style("stroke",nodehighlighter)
              .style("stroke-width","6px");

          d3.select("#node-"+key_to_highlight)
              .transition().duration(this.animDuration).delay(1000)
              .style("stroke",this.node_color)
              .style("stroke-width","6px");


      }

  }
