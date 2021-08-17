# This is a sample Python script.

# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.

def analysisDecision(patientVals):
    i=0

    # This is the vector v found from LDA computed in MATLAB script.
    v=[0.003051012515295, -0.665373047907120, -0.351677368105463, -0.009179098146992, -0.001452521668132, 0.408370530219093, -0.139506054033309, 0.011118892402065, -0.549605003321498, -0.118476977793541, -0.288003580178490, -0.589426564972052, -0.521617653186352]
    # This is the threshold yielding 86% accuracy (details found in MATLAB script)
    thresh=-2.4

    # This loop computes the inner product of the user data inputted with the vector v as per the LDA process to find the variable that maximally separates the 2 classes
    patientV=0
    while(i<13):
        patientV+=patientVals[i]*v[i]
        i=i+1
    print(patientV)

    # Decision found here: comparison with the threshold. If > threshold then patient is healthy. Otherwise patient has heart disease
    if(patientV<=thresh):
        print("The data provided tells us that you might be at risk of heart disease. Please consult your doctor to find out a possible course of action.")
    else:
        print("Looks like youre good :)")


if __name__ == '__main__':
    analysisDecision([71, 1, 1, 154, 300, 1, 2, 188, 1, 2, 2, 2, 0])