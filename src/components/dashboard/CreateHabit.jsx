import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Radio, Checkbox, Card, List, ListItem, ListItemPrefix, Typography  } from "@/components/MaterialUI"

export default function CreateHabit({isModalOpen, toggleModal}) {
    return (
        <>
            <Dialog open={isModalOpen} handler={toggleModal} size="xs">
                <DialogHeader>
                    New Habit
                </DialogHeader>
                <DialogBody>
                    <form>
                        <label>Habit Name</label>
                        <Input placeholder="Exercise" id="name"/>
                        <br/><label>Color</label>
                        <div className="flex flex-wrap">
                            {
                                ['grey', 'orange', 'green', 'blue', 'purple', 'red'].map((color, index) => {
                                    return (
                                        <div key={index} className="flex flex-col justify-center items-center p-0.5">
                                            <Radio name="color" color={color} id="color" value={color} />
                                            <label className={`text-${color}-500 text-sm`}>{color}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <br/><label>Frequency</label>
                        <div className="flex flex-wrap">
                            {
                                ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
                                    return (
                                        <div key={index} className="flex flex-col justify-center items-center p-0.5">
                                            <Checkbox id="activeDays" value={day}/>
                                            <label className={`text-sm`}>{day}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={toggleModal} className="mr-1">
                        <span>Cancel</span>
                    </Button>
                    <Button type="submit" variant="gradient" color="blue-gray">
                        <span>Add Habit</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}