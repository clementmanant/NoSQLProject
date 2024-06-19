import RPi.GPIO as GPIO
import time

from RpiMotorLib import RpiMotorLib
# from gpiozero import Servo


### CONSTANTS ###
vodka_redbull = [
    {
        "ingredient_id": 1,
        "quantity": 2,
        "ordre": 1,
        "ingredient": "vodka"
    }, {
        "ingredient_id": 3,
        "quantity": 4,
        "ordre": 2,
        "ingredient": "redbull"
    }
]

vodka_coca = [
    {
        "ingredient_id": 1,
        "quantity": 2,
        "ordre": 1,
        "ingredient": "vodka"
    }, {
        "ingredient_id": 4,
        "quantity": 4,
        "ordre": 2,
        "ingredient": "coca"
    }
]

vodka_multifruit = [
    {
        "ingredient_id": 1,
        "quantity": 2,
        "ordre": 1,
        "ingredient": "vodka"
    }, {
        "ingredient_id": 2,
        "quantity": 4,
        "ordre": 2,
        "ingredient": "multifruit"
    }
]

rhum_coca = [
    {
        "ingredient_id": 4,
        "quantity": 4,
        "ordre": 2,
        "ingredient": "coca"
    }, {
        "ingredient_id": 5,
        "quantity": 2,
        "ordre": 1,
        "ingredient": "rhum"
    }
]

rhum_multifruit = [
    {
        "ingredient_id": 2,
        "quantity": 4,
        "ordre": 2,
        "ingredient": "multifruit"
    }, {
        "ingredient_id": 5,
        "quantity": 2,
        "ordre": 1,
        "ingredient": "rhum"
    }
]

rhum_redbull = [
    {
        "ingredient_id": 3,
        "quantity": 4,
        "ordre": 2,
        "ingredient": "redbull"
    }, {
        "ingredient_id": 5,
        "quantity": 2,
        "ordre": 1,
        "ingredient": "rhum"
    }
]

vodka = [
    {
        "ingredient_id": 1,
        "quantity": 3,
        "ordre": 1,
        "ingredient": "vodka"
    }
]

multifruit = [
    {
        "ingredient_id": 2,
        "quantity": 6,
        "ordre": 1,
        "ingredient": "multifruit"
    }
]

redbull = [
    {
        "ingredient_id": 3,
        "quantity": 6,
        "ordre": 1,
        "ingredient": "redbull"
    }
]

coca = [
    {
        "ingredient_id": 4,
        "quantity": 6,
        "ordre": 1,
        "ingredient": "coca"
    }
]

rhum = [
    {
        "ingredient_id": 5,
        "quantity": 3,
        "ordre": 1,
        "ingredient": "rhum"
    }
]

tout = [
    {
        "ingredient_id": 1,
        "quantity": 1,
        "ordre": 1,
        "ingredient": "vodka"
    }, {
        "ingredient_id": 2,
        "quantity": 1,
        "ordre": 5,
        "ingredient": "multifruit"
    }, {
        "ingredient_id": 3,
        "quantity": 1,
        "ordre": 4,
        "ingredient": "redbull"
    }, {
        "ingredient_id": 4,
        "quantity": 1,
        "ordre": 3,
        "ingredient": "coca"
    }, {
        "ingredient_id": 5,
        "quantity": 1,
        "ordre": 2,
        "ingredient": "rhum"
    }
]

# Simulate the API call
drink_list = [rhum_coca, rhum_coca, tout]


### CLASSES ###
# Control SG90 (Valve)
class SG():
    #GPIO number for SG90 (need PWM pin)
    SG90_PIN = 18
    
    def __init__(self):
        
        GPIO.setup(self.SG90_PIN, GPIO.OUT)
        self.pwm = GPIO.PWM(self.SG90_PIN, 200)
        self.pwm.start(0)
        
    # Close pwm when shutting down
    def endValve(self):
        #GPIO.cleanup()
        self.pwm.stop()
    
    # With a given angle give the percent wanted for the ChangeDutyCycle function
    def angle_to_percent(self, angle):
        if angle > 180 or angle < 0:
            return False
        
        # Change depending on the frequency
        start = 16
        end = 50
        ratio = (end-start)/180
        
        angle_as_percent = angle*ratio
        
        return start + angle_as_percent
        
    # Activate the motor for a certain time
    def openValve(self, openTime):
        print("Valve Opened")
        self.pwm.ChangeDutyCycle(self.angle_to_percent(135))
        time.sleep(0.2)
        # ChangeDutyCycle(0) change the duty to 0 to stop the motor from moving without closing the pwm
        self.pwm.ChangeDutyCycle(0)
        time.sleep(openTime)
        self.pwm.ChangeDutyCycle(self.angle_to_percent(45))
        time.sleep(0.2)
        self.pwm.ChangeDutyCycle(0)
        print("Valve Closed")
        
    # Test function
    def test(self, openTime):
        self.pwm.ChangeDutyCycle(self.angle_to_percent(135))
        time.sleep(0.2)
        self.pwm.ChangeDutyCycle(0)
        time.sleep(openTime)
        print("2")
        self.pwm.ChangeDutyCycle(self.angle_to_percent(45))
        time.sleep(0.2)
        self.pwm.ChangeDutyCycle(0)
        
# Control Nema17 (Barrel)
class Nema():
    
    # Change the pins depending on your setup
    GPIO_pins = (14, 15, 17)
    direction = 20
    step = 21
    # To keep in mind motor position
    default_pos = 0
    actual_pos = 0
    # Setup motor
    mymotor = RpiMotorLib.A4988Nema(direction, step, GPIO_pins, "A4988")
    
    def __init__(self):
        pass
    
    # Reset position to default position
    def resetPos(self):
        if self.actual_pos != self.default_pos:
            self.mymotor.motor_go(False, "Full", 200-self.actual_pos, .01, False, .05)
            self.actual_pos = 0
    
    # Move motor to based on direction and th enumber of steps
    def move(self, direction, nbSteps):
        self.mymotor.motor_go(direction, "Full", nbSteps, .01, False, .05)
        self.actual_pos = self.actual_pos + nbSteps
        
# Control MCC (Glasses)
class MCC():
    
    in1 = 6
    in2 = 5
    en = 26
    
    def __init__(self):
        GPIO.setup(self.en, GPIO.OUT)
        GPIO.setup(self.in1, GPIO.OUT)
        GPIO.setup(self.in2, GPIO.OUT)

        GPIO.output(self.en, GPIO.HIGH)
        GPIO.output(self.in1, GPIO.LOW)
        GPIO.output(self.in2, GPIO.HIGH)
        
        self.pwm = GPIO.PWM(self.en, 100)
        self.pwm.start(0)
        
    # Move the motor for one glass
    def move(self):
        self.pwm.ChangeDutyCycle(35)
        time.sleep(0.7)
        self.pwm.ChangeDutyCycle(0)
        
    # Close pwm when shutting down
    def endMCC(self):
        self.pwm.stop()

### FUNCTIONS ###
# Serve what's in the drink_list
def serve(list, sg, nema, mcc):
    print("Start")
    for drink in list:
            drink.sort(key=lambda x: x["ordre"])
            
            print("Nouveau verre : " + str(drink))
            mcc.move()
            
            for ingredient in drink:
                print(ingredient)
                direction = False
                nbSteps = ingredient["ingredient_id"] * 40 - nema.actual_pos
                if nbSteps < 0:
                    direction = True
                nema.mymotor.motor_go(direction, "Full", abs(nbSteps), .01, False, .05)
                nema.actual_pos = nema.actual_pos + nbSteps
                print("Ingredient id : " + str(ingredient["ingredient_id"]) + " Position actuelle : " + str(abs(nema.actual_pos)) + " Quantité : " + str(ingredient["quantity"]))
                time.sleep(0.5)
                sg.openValve(ingredient["quantity"])
    nema.resetPos()
    print("End")
            
        

### SETUP ###
GPIO.setmode(GPIO.BCM)

sg = SG()
nema = Nema()
mcc = MCC()

serve(drink_list, sg, nema, mcc)

GPIO.cleanup()





















