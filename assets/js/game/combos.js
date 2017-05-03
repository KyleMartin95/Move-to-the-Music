var combos = {
	names : ["Zero","Xtreme_Three_Step","Whirlwind","Warm_Er_Up","Turning_Back_The_Clock","Triple_Jump","Thunderstorm","The_Crazy_Step","Suspended_In_Time","Super_Slide","Spontaneous_Combustion","Somersault","Sidewinder","Sicktackular","Screwball","Scintillator","Running_Man","Rock_A_By","Right_Waggle","Annihilator","Around_The_World","Atomic_Accelerator","Back_To_The_Future","Blast_Off","Bring_The_Pain","Carolina_Two_Step","Chromosomal","Easy_As_Pie","Exit_Hatch","Faster_Blaster","Flipside_360","Insinerator","Jagged_Edge","Jazzy_Tussle","Left_Waggle","Nerve_Crusher","Jackhammer","Bazooka","Berserker","Bombardment","Canonball","Corkscrew","Inferno","PyschoTee","Splinter","Torpedo","ZigZag"],
	Bazooka : {
		first : 'down',
		second : 'down',
		third : 'up',
	},
	Jackhammer : {
		first : 'back_left',
		second : 'back_right',
		third : 'up',
	},
	Berserker : {
		first : 'left',
		second : 'back_right',
		third : 'up_left',
	},
	Bombardment : {
		first : 'right',
		second : 'right',
		third : 'up',
	},
	Canonball : {
		first : 'left',
		second : 'up',
		third : 'right',
	},
	Corkscrew : {
		first : 'up_left',
		second : 'up',
		third : 'back_right',
	},
	Inferno : {
		first : 'back_right',
		second : 'down',
		third : 'back_left',
	},
	PyschoTee : {
		first : 'up_left',
		second : 'up_right',
		third : 'back_left',
	},
	Splinter : {
		first : 'up_left',
		second : 'up',
		third : 'up_right',
	},
	Torpedo : {
		first : 'up',
		second : 'up',
		third : 'down',
	},
	ZigZag : {
		first : 'back_left',
		second : 'right',
		third : 'up_left',
	},
	//////////////////////////////
	Zero : {
		first : 'down',
		second : 'up_left',
		third : 'up_left',
	},
	Xtreme_Three_Step : {
		first : 'down',
		second : 'right',
		third : 'up_left',
	},
	Whirlwind : {
		first : 'down',
		second : 'left',
		third : 'up',
	},
	Warm_Er_Up : {
		first : 'down',
		second : 'down',
		third : 'right',
	},
	Turning_Back_The_Clock : {
		first : 'up',
		second : 'right',
		third : 'up_left',
	},
	Triple_Jump : {
		first : 'up',
		second : 'down',
		third : 'up',
	},
	Thunderstorm : {
		first : 'up',
		second : 'up_right',
		third : 'back_left',
	},
	The_Crazy_Step : {
		first : 'up',
		second : 'left',
		third : 'back_right',
	},
	Suspended_In_Time : {
		first : 'back_left',
		second : 'up_right',
		third : 'up_right',
	},
	Super_Slide : {
		first : 'back_left',
		second : 'left',
		third : 'up_right',
	},
	Spontaneous_Combustion : {
		first : 'back_left',
		second : 'down',
		third : 'up_left',
	},
	Somersault : {
		first : 'back_left',
		second : 'up',
		third : 'down',
	},
	Sidewinder : {
		first : 'back_right',
		second : 'down',
		third : 'right',
	},
	Sicktackular : {
		first : 'back_right',
		second : 'right',
		third : 'up_left',
	},
	Screwball : {
		first : 'back_right',
		second : 'up',
		third : 'down',
	},
	Scintillator : {
		first : 'back_right',
		second : 'back_right',
		third : 'up_left',
	},
	Running_Man : {
		first : 'up_right',
		second : 'right',
		third : 'back_right',
	},
	Rock_A_By : {
		first : 'up_right',
		second : 'left',
		third : 'up',
	},
	Right_Waggle : {
		first : 'up_right',
		second : 'right',
		third : 'down',
	},
	Annihilator : {
		first : 'up_right',
		second : 'back_left',
		third : 'back_left',
	},
	Around_The_World : {
		first : 'up_left',
		second : 'up_right',
		third : 'up_left',
	},
	Atomic_Accelerator : {
		first : 'up_left',
		second : 'down',
		third : 'left',
	},
	Back_To_The_Future : {
		first : 'up_left',
		second : 'right',
		third : 'up_left',
	},
	Blast_Off : {
		first : 'up_left',
		second : 'left',
		third : 'back_left',
	},
	Bring_The_Pain : {
		first : 'right',
		second : 'back_left',
		third : 'up_right',
	},
	Carolina_Two_Step : {
		first : 'right',
		second : 'up',
		third : 'up_left',
	},
	Chromosomal : {
		first : 'right',
		second : 'down',
		third : 'down',
	},
	Easy_As_Pie : {
		first : 'right',
		second : 'right',
		third : 'down',
	},
	Exit_Hatch : {
		first : 'left',
		second : 'right',
		third : 'up_left',
	},
	Faster_Blaster : {
		first : 'left',
		second : 'right',
		third : 'left',
	},
	Flipside_360 : {
		first : 'left',
		second : 'up_left',
		third : 'down',
	},
	Insinerator : {
		first : 'left',
		second : 'left',
		third : 'right',
	},
	Jagged_Edge : {
		first : 'back_right',
		second : 'left',
		third : 'up_left',
	},
	Jazzy_Tussle : {
		first : 'back_right',
		second : 'right',
		third : 'up',
	},
	Left_Waggle : {
		first : 'back_right',
		second : 'down',
		third : 'left',
	},
	Nerve_Crusher : {
		first : 'back_right',
		second : 'up',
		third : 'up',
	},
}
