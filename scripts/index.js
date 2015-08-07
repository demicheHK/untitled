/**
 * Created by camilledemichel on 30/07/15.
 */
console.log("a");

var diameter = 960,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var dataset2 = [];

var dataset = [];
console.log("b");

d3.csv("scripts/questionnaire.csv")
    .row(function(d, i) {
        //console.log(d);
        console.log('d3.csv row',d['Quelle est votre année de naissance ?']);
        if(isNaN(bac(d["Quel est votre niveau de formation académique ?"])))return;
        if(d['Quelle est votre année de naissance ?']<1895)return;
        var obj={
            naissance: d['Quelle est votre année de naissance ?'],
            sexe:Math.floor(Math.random()*3),
            bacplus:bac(d["Quel est votre niveau de formation académique ?"]),
            pays: d['Quel est votre pays de résidence ?'],
            statut : d["Quel est votre statut professionnel ?"],
            formation : d['Quelle est votre formation ?'],
            inscription : d['Etes-vous inscrit à titre personnel ou par votre entreprise ?'],
            finance : d['Exercez-vous un métier directement dans la finance ?'],
            uid:d['Quelle est votre année de naissance ?']+"|"+d["Quel est votre niveau de formation académique ?"]
        };
        return obj;

    })
    .get(function(error, rows) {
        //console.log(rows);
        console.log("get");
        dataset = rows;
        /*
        dataset2 = d3.nest()
            .key(function (d) {
                return d.uid;
            })
            .entries(dataset)
*/

});

d3.json("scripts/questionnaire.csv", function(error, rows) {
    //if (error) throw error;

    var node = svg.selectAll(".node")
        .data(bubble.nodes(classes(rows))
            .filter(function(d) { return !d.; }))
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("title")
        .text(function(d) { return d.className + ": " + format(d.value); });

    node.append("circle")
        .attr("r", function(d) { return d.uid; })
        .style("fill", function(d) { return color(d.packageName); });

    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.className.substring(0, d.r / 3); });
});


console.log("d");

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(rows) {
    var classes = [];

    function recurse(name, node) {
        if (node.formation) node..forEach(function(child) { recurse(node.name, child); });
        else classes.push({packageName: name, className: node.name, value: node.size});
    }

    recurse(null, rows);
    return {children: classes};
}

///d3.select(self.frameElement).style("height", diameter + "px");

