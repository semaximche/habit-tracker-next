import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Radio, Checkbox } from "@/components/MaterialUI"
import { UseAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase/firebaseInit";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

export default function CreateHabit({isModalOpen, toggleModal}) {
    const [handling, setHandling] = useState(false);
    const { user } = UseAuth();

    // TODO add check for input
    // TODO add check for habit name
    // If two habits have the same name they wont be deleted correctly (will choose one at random)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!handling) {
            toggleModal();
            setHandling(true);
            const habitsRef = collection(db, `/users/${user?.uid}/habits`);
            const formActiveDays = [];
            e.target.elements.activeDays.forEach((element, index) => {
                if(element.checked) {
                    formActiveDays.push(index);
                }
            });
            const docRef = await addDoc(habitsRef, {
                name: e.target.elements.name.value,
                color: e.target.elements.color.value,
                completeDays: [],
                activeDays: formActiveDays,
            });
            setHandling(false);
        }
    }

    return (
        <>
            <Dialog open={isModalOpen} handler={toggleModal} size="xs">
                <DialogHeader>
                    New Habit
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <DialogBody>
                        <Input label="Habit Name" placeholder="Exercise" id="name"/>
                        <br/><label>Color</label>
                        <div className="flex flex-wrap">
                            {
                                ['grey', 'orange', 'green', 'blue', 'purple', 'red'].map((color, index) => {
                                    return (
                                        <div key={index} className="flex flex-col justify-center items-center p-0.5">
                                            <Radio ripple={false} className="hover:before:opacity-0" name="color" color={color} id="color" value={`bg-${color}-500`} />
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
                                            <Checkbox ripple={false} className="hover:before:opacity-0" id="activeDays" value={day}/>
                                            <label className={`text-sm`}>{day}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button variant="text" color="red" type="button" onClick={toggleModal} className="mr-1">
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="blue-gray" type="submit">
                            <span>Add Habit</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    )
}