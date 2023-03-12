import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { AuthenticationError } from "../4-models/client-errors";

async function verifyLoggedIn(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        // Verify token - crash if not valid:
        const isValid = await cyber.verifyToken(request);
        
        if(!isValid) throw new AuthenticationError("not good!") 
        // If valid - continue:
        next();
    }
    catch (err: any) {
        next(err);
    }

}

export default verifyLoggedIn;